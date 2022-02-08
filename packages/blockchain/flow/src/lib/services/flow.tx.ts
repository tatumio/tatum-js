import * as elliptic from 'elliptic'
import * as fcl from '@onflow/fcl'
import * as types from '@onflow/types'
import { ECDSA_secp256k1, encodeKey, SHA3_256 } from '@onflow/util-encode-key'
import SHA3 from 'sha3'
import {
  ChainFlowBurnNft,
  ChainFlowMintMultipleNft,
  ChainFlowMintNft,
  ChainFlowTransferNft,
  Currency,
  FlowArgs,
  FlowBurnNft,
  FlowMintMultipleNft,
  FlowMintNft,
  FlowMnemonicOrPrivateKeyOrSignatureId,
  FlowTransferNft,
  Transaction,
  TransactionResult,
  TransferFlow,
  TransferFlowCustomTx,
} from '@tatumio/shared-core'
import {
  burnNftTokenTxTemplate,
  metadataNftTokenScript,
  mintMultipleNftTokenTxTemplate,
  mintNftTokenTxTemplate,
  prepareAddPublicKeyToAccountTxTemplate,
  prepareCreateAccountWithFUSDFromPublicKeyTxTemplate,
  prepareTransferTxTemplate,
  tokenByAddressNftTokenScript,
  transferNftTokenTxTemplate,
} from './transactions'
import { flowWallet } from './flow.sdk.wallet'
import { flowBlockchain } from './flow.blockchain'

export const FLOW_TESTNET_ADDRESSES = {
  FlowToken: '0x7e60df042a9c0868',
  FungibleToken: '0x9a0766d93b6608b7',
  FUSD: '0xe223d8a629e49c68',
  TatumMultiNFT: '0x87fe4ebd0cddde06',
}

export const FLOW_MAINNET_ADDRESSES = {
  FlowToken: '0x1654653399040a61',
  FungibleToken: '0xf233dcee88fe0abe',
  FUSD: '0x3c5959b568896393',
  TatumMultiNFT: '0x354e6721564ccd2c',
}

const flowSdkWallet = flowWallet()
const flowSdkBlockchain = flowBlockchain()

export const flowTxService = () => {
  return {
    sign,
    getSigner,
    getApiSigner,
    /**
     * Create account on the FLOW network. It automatically creates 100 0-weight proposal keys, which are managed by Tatum API - index 1-100.
     * Main 1000 weight authorizer key is stored as a first one on index 0.
     * @param testnet if we use testnet or not
     * @param publicKey public key to assign to address as authorizer (1000 weight) key
     * @param signerAddress address of the authorizer creator of the address on the chain
     * @param signerPrivateKey private key of the authorizer creator of the address on the chain
     * @param proposer function to obtain proposer key from
     * @param payer function to obtain payer key from
     */
    createAccountFromPublicKey: async (
      testnet: boolean,
      publicKey: string,
      signerAddress: string,
      signerPrivateKey: string,
      proposer?: (isPayer: boolean) => any,
      payer?: (isPayer: boolean) => any,
    ): Promise<{ txId: string; address: string }> => {
      const code = prepareCreateAccountWithFUSDFromPublicKeyTxTemplate(testnet)
      const encodedPublicKey = encodeKey(publicKey, ECDSA_secp256k1, SHA3_256, 1000)
      const args = [{ type: 'String', value: encodedPublicKey }]
      const auth = getSigner(signerPrivateKey, signerAddress).signer
      const { signer: proposalSigner, keyHash } = proposer ? proposer(false) : getApiSigner(false)
      const result = await _sendTransaction(testnet, {
        code,
        args,
        proposer: proposer ? proposer(false) : proposalSigner,
        authorizations: [auth],
        payer: payer ? payer(true) : getApiSigner(true).signer,
        keyHash,
      })
      if (result.error) {
        throw new Error(result.error)
      }
      return {
        txId: result.id,
        address: result.events.find((e: any) => e.type === 'flow.AccountCreated')?.data.address,
      }
    },
    /**
     * Add public key to existing blockchain address with defined weight
     * @param testnet
     * @param publicKey key to add
     * @param signerAddress address of the authorizer key
     * @param signerPrivateKey key of the authorize key
     * @param weight defaults to 1000 - weight of the key
     * @param proposer function to obtain proposer key from
     * @param payer function to obtain payer key from
     */
    addPublicKeyToAccount: async (
      testnet: boolean,
      publicKey: string,
      signerAddress: string,
      signerPrivateKey: string,
      weight = 0,
      proposer?: (args: any) => any,
      payer?: (args: any) => any,
    ): Promise<{ txId: string; address: string }> => {
      const code = prepareAddPublicKeyToAccountTxTemplate()
      const encodedPublicKey = encodeKey(publicKey, ECDSA_secp256k1, SHA3_256, weight)
      const args = [{ type: 'String', value: encodedPublicKey }]
      const auth = getSigner(signerPrivateKey, signerAddress).signer
      const { signer: proposalSigner, keyHash } = proposer ? proposer(false) : getApiSigner(false)
      const result = await _sendTransaction(testnet, {
        code,
        args,
        proposer: proposer ? proposer(false) : proposalSigner,
        authorizations: [auth],
        keyHash,
        payer: payer ? payer(true) : getApiSigner(true).signer,
      })
      if (result.error) {
        throw new Error(result.error)
      }
      return { txId: result.id, address: result.events[0].data.address }
    },
    getNftMetadata: async (testnet: boolean, account: string, id: string, contractAddress: string) => {
      const code = metadataNftTokenScript(testnet)
      const args = [
        { type: 'Address', value: account },
        { type: 'UInt64', value: id },
        { type: 'String', value: contractAddress },
      ]
      return sendScript(testnet, code, args)
    },
    getNftTokenByAddress: async (testnet: boolean, account: string, contractAddress: string) => {
      const code = tokenByAddressNftTokenScript(testnet)
      const args = [
        { type: 'Address', value: account },
        { type: 'String', value: contractAddress },
      ]
      return sendScript(testnet, code, args)
    },
    /**
     * Send Flow NFT mint token transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
     * This operation is irreversible.
     * @param testnet
     * @param body content of the transaction to broadcast
     * @param proposer function to obtain proposer key from
     * @param payer function to obtain payer key from
     * @returns txId id of the transaction in the blockchain
     */
    sendNftMintToken: async (
      testnet: boolean,
      body: ChainFlowMintNft,
      proposer?: (isPayer: boolean) => any,
      payer?: (isPayer: boolean) => any,
    ): Promise<{ txId: string; tokenId: string }> => {
      const bodyWithChain: FlowMintNft = { ...body, chain: Currency.FLOW }
      const code = mintNftTokenTxTemplate(testnet)
      const { url, contractAddress: tokenType, to, account } = bodyWithChain
      const args = [
        { type: 'Address', value: to },
        { type: 'String', value: url },
        { type: 'String', value: tokenType },
      ]
      const pk = await getPrivateKey(bodyWithChain, true)
      if (!pk) throw new Error('No private key available')
      const auth = getSigner(pk, account).signer
      const { signer: proposalSigner, keyHash } = proposer ? proposer(false) : getApiSigner(false)
      const result = await _sendTransaction(testnet, {
        code,
        args,
        proposer: proposer ? proposer(false) : proposalSigner,
        authorizations: [auth],
        keyHash,
        payer: payer ? payer(true) : getApiSigner(true).signer,
      })
      if (result.error) {
        throw new Error(result.error)
      }
      return {
        txId: result.id,
        tokenId: `${result.events.find((e: any) => e.type.includes('TatumMultiNFT.Minted'))?.data.id}`,
      }
    },
    /**
     * Send Flow NFT mint multiple tokens transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
     * This operation is irreversible.
     * @param testnet
     * @param body content of the transaction to broadcast
     * @param proposer function to obtain proposer key from
     * @param payer function to obtain payer key from
     * @returns txId id of the transaction in the blockchain
     */
    sendNftMintMultipleToken: async (
      testnet: boolean,
      body: ChainFlowMintMultipleNft,
      proposer?: (isPayer: boolean) => any,
      payer?: (isPayer: boolean) => any,
    ): Promise<{ txId: string; tokenId: number[] }> => {
      const bodyWithChain: FlowMintMultipleNft = { ...body, chain: Currency.FLOW }
      const code = mintMultipleNftTokenTxTemplate(testnet)
      const { url, contractAddress: tokenType, to, account } = bodyWithChain
      const args = [
        { type: 'Array', subType: 'Address', value: to },
        {
          type: 'Array',
          subType: 'String',
          value: url,
        },
        { type: 'String', value: tokenType },
      ]
      const pk = await getPrivateKey(bodyWithChain, true)
      if (!pk) throw new Error('No private key available')
      const { signer: proposalSigner, keyHash } = proposer ? proposer(false) : getApiSigner(false)
      const auth = getSigner(pk, account).signer
      const result = await _sendTransaction(testnet, {
        code,
        args,
        proposer: proposer ? proposer(false) : proposalSigner,
        authorizations: [auth],
        payer: payer ? payer(true) : getApiSigner(true).signer,
        keyHash,
      })
      if (result.error) {
        throw new Error(result.error)
      }
      return {
        txId: result.id,
        tokenId: result.events
          .filter((e: any) => e.type.includes('TatumMultiNFT.Minted'))
          .map((e) => e.data.id),
      }
    },
    /**
     * Send Flow NFT transfer token transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
     * This operation is irreversible.
     * @param testnet
     * @param body content of the transaction to broadcast
     * @param proposer function to obtain proposer key from
     * @param payer function to obtain payer key from
     * @returns {txId: string, events: any[]} id of the transaction in the blockchain and events this tx produced
     */
    sendNftTransferToken: async (
      testnet: boolean,
      body: ChainFlowTransferNft,
      proposer?: (isPayer: boolean) => any,
      payer?: (isPayer: boolean) => any,
    ): Promise<{ txId: string }> => {
      const bodyWithChain: FlowTransferNft = { ...body, chain: Currency.FLOW }
      const code = transferNftTokenTxTemplate(testnet)
      const { tokenId, to, account } = bodyWithChain
      const args = [
        { type: 'Address', value: to },
        { type: 'UInt64', value: tokenId },
      ]
      const pk = await getPrivateKey(bodyWithChain, true)
      if (!pk) throw new Error('No private key available')
      const { signer: proposalSigner, keyHash } = proposer ? proposer(false) : getApiSigner(false)
      const auth = getSigner(pk, account).signer
      const result = await _sendTransaction(testnet, {
        code,
        args,
        proposer: proposer ? proposer(false) : proposalSigner,
        authorizations: [auth],
        payer: payer ? payer(true) : getApiSigner(true).signer,
        keyHash,
      })
      if (result.error) {
        throw new Error(result.error)
      }
      return { txId: result.id }
    },
    /**
     * Send Flow NFT burn token transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
     * This operation is irreversible.
     * @param testnet
     * @param body content of the transaction to broadcast
     * @param proposer function to obtain proposer key from
     * @param payer function to obtain payer key from
     * @returns txId id of the transaction in the blockchain
     */
    sendNftBurnToken: async (
      testnet: boolean,
      body: ChainFlowBurnNft,
      proposer?: (isPayer: boolean) => any,
      payer?: (isPayer: boolean) => any,
    ): Promise<{ txId: string }> => {
      const bodyWithChain: FlowBurnNft = { ...body, chain: Currency.FLOW }
      const code = burnNftTokenTxTemplate(testnet)
      const { tokenId, contractAddress: tokenType, account } = bodyWithChain
      const args = [
        { type: 'UInt64', value: tokenId },
        { type: 'String', value: tokenType },
      ]
      const pk = await getPrivateKey(bodyWithChain, true)
      if (!pk) throw new Error('No private key available')
      const { signer: proposalSigner, keyHash } = proposer ? proposer(false) : getApiSigner(false)
      const auth = getSigner(pk, account).signer
      const result = await _sendTransaction(testnet, {
        code,
        args,
        proposer: proposer ? proposer(false) : proposalSigner,
        authorizations: [auth],
        payer: payer ? payer(true) : getApiSigner(true).signer,
        keyHash,
      })
      if (result.error) {
        throw new Error(result.error)
      }
      return { txId: result.id }
    },
    /**
     * Send custom transaction to the FLOW network
     * @param testnet
     * @param body content of the transaction to broadcast
     * @param proposer function to obtain proposer key from
     * @param payer function to obtain payer key from
     * @returns txId id of the transaction in the blockchain
     */
    sendCustomTransaction: async (
      testnet: boolean,
      body: TransferFlowCustomTx,
      proposer?: (isPayer: boolean) => any,
      payer?: (isPayer: boolean) => any,
    ): Promise<{ txId: string; events: any[] }> => {
      const pk = await getPrivateKey(body)
      if (!pk) throw new Error('No private key available')
      const auth = getSigner(pk, body.account).signer
      const { signer: proposalSigner, keyHash } = proposer ? proposer(false) : getApiSigner(false)
      const result = await _sendTransaction(testnet, {
        code: body.transaction,
        args: body.args,
        proposer: proposer ? proposer(false) : proposalSigner,
        authorizations: [auth],
        keyHash,
        payer: payer ? payer(true) : getApiSigner(true).signer,
      })
      if (result.error) {
        throw new Error(result.error)
      }
      return { txId: result.id, events: result.events }
    },
    /**
     * Send FLOW or FUSD from account to account.
     * @param testnet
     * @param body content of the transaction to broadcast
     * @param proposer function to obtain proposer key from
     * @param payer function to obtain payer key from
     * @returns txId id of the transaction in the blockchain
     */
    sendTransaction: async (
      testnet: boolean,
      body: TransferFlow,
      proposer?: (isPayer: boolean) => any,
      payer?: (isPayer: boolean) => any,
    ): Promise<{ txId: string }> => {
      let tokenAddress
      let tokenName
      let tokenStorage
      if (body.currency === Currency.FLOW) {
        tokenAddress = testnet ? FLOW_TESTNET_ADDRESSES.FlowToken : FLOW_MAINNET_ADDRESSES.FlowToken
        tokenName = 'FlowToken'
        tokenStorage = 'flowToken'
      } else {
        tokenAddress = testnet ? FLOW_TESTNET_ADDRESSES.FUSD : FLOW_MAINNET_ADDRESSES.FUSD
        tokenName = 'FUSD'
        tokenStorage = 'fusd'
      }
      const code = prepareTransferTxTemplate(testnet, tokenAddress, tokenName, tokenStorage)
      const args = [
        { value: parseFloat(body.amount).toFixed(8), type: 'UFix64' },
        { value: body.to, type: 'Address' },
      ]
      const pk = await getPrivateKey(body)
      if (!pk) throw new Error('No private key available')
      const { signer: proposalSigner, keyHash } = proposer ? proposer(false) : getApiSigner(false)
      const auth = getSigner(pk, body.account).signer
      const result = await _sendTransaction(testnet, {
        code,
        args,
        proposer: proposer ? proposer(false) : proposalSigner,
        authorizations: [auth],
        payer: payer ? payer(true) : getApiSigner(true).signer,
        keyHash,
      })
      if (result.error) {
        throw new Error(result.error)
      }
      return { txId: result.id }
    },
  }
}

const getPrivateKey = async (body: FlowMnemonicOrPrivateKeyOrSignatureId, tryMnemFirst = false) => {
  const { mnemonic, index, privateKey } = body
  if (tryMnemFirst) {
    return mnemonic && index && index >= 0
      ? flowSdkWallet.generatePrivateKeyFromMnemonic(mnemonic, index)
      : privateKey
  } else {
    if (privateKey) {
      return privateKey
    } else {
      if (mnemonic && index && index >= 0) {
        return flowSdkWallet.generatePrivateKeyFromMnemonic(mnemonic, index)
      } else throw new Error('Insufficient info provided. Either private key or mnemonic required.')
    }
  }
}

const sign = (pk: string, msg: Buffer) => {
  const keyPair = new elliptic.ec('secp256k1').keyFromPrivate(pk)
  const signature = keyPair.sign(new SHA3(256).update(msg).digest())
  const r = signature.r.toArrayLike(Buffer, 'be', 32)
  const s = signature.s.toArrayLike(Buffer, 'be', 32)

  return Buffer.concat([r, s]).toString('hex')
}
const getSigner = (pk: string, address: string, keyId = 0) => {
  return {
    signer: (account: any) => {
      return {
        ...account,
        tempId: `${address}-${keyId}`,
        addr: fcl.sansPrefix(address),
        keyId: Number(keyId),
        signingFunction: async (data: any) => {
          return {
            addr: fcl.withPrefix(address),
            keyId: Number(keyId),
            signature: flowTxService().sign(pk, Buffer.from(data.message, 'hex')),
          }
        },
      }
    },
  }
}
const getApiSigner = (isPayer: boolean) => {
  const keyHash = Date.now()
  const signer = async (account: any) => {
    const { address, keyId } = await flowSdkBlockchain.getSignKey(isPayer)
    if (!isPayer) {
      process.env[`FLOW_PROPOSAL_KEY_${keyHash}`] = `${keyId}`
    }
    return {
      ...account,
      tempId: `${address}-${keyId}`,
      addr: fcl.sansPrefix(address),
      keyId,
      signingFunction: async (data: { message: string }) => {
        return {
          addr: fcl.withPrefix(address),
          keyId: Number(keyId),
          signature: (await flowSdkBlockchain.signWithKey(data.message, isPayer)).signature,
        }
      },
    }
  }
  return { signer, keyHash: `FLOW_PROPOSAL_KEY_${keyHash}` }
}
const _sendTransaction = async (
  testnet: boolean,
  { code, args, proposer, authorizations, payer, keyHash }: Transaction,
): Promise<TransactionResult> => {
  fcl.config().put('accessNode.api', networkUrl(testnet))
  let response
  try {
    response = await fcl.send([
      fcl.transaction(code),
      fcl.args(args.map((arg) => fcl.arg(UInt64ArgValue(arg), ArrayArgValue(arg)))),
      fcl.proposer(proposer),
      fcl.authorizations(authorizations),
      fcl.payer(payer),
      fcl.limit(1000),
    ])
  } catch (e) {
    console.error('Sending transaction with Flow client failed:', e)
    try {
      if (keyHash) {
        await flowSdkBlockchain.broadcast('', undefined, proposalKey(keyHash))
        delete process.env[keyHash]
      }
      // eslint-disable-next-line no-empty
    } catch (_) {
      console.error('Broadcasting to Flow blockchain failed', e)
      throw _
    }
    throw e
  }

  const { transactionId } = response
  try {
    const { error, events } = await fcl.tx(response).onceSealed()
    return {
      id: transactionId,
      error,
      events,
    }
  } catch (e) {
    console.log('Sealing transaction on Flow chain failed:', e)
    throw e
  } finally {
    try {
      if (keyHash) {
        await flowSdkBlockchain.broadcast(transactionId, undefined, proposalKey(keyHash))
        delete process.env[keyHash]
      }
    } catch (_) {
      console.error('Broadcasting to Flow blockchain failed', _)
    }
  }
}

const sendScript = async (testnet: boolean, code: string, args: FlowArgs[]) => {
  fcl.config().put('accessNode.api', networkUrl(testnet))
  const response = await fcl.send([
    fcl.script(code),
    fcl.args(args.map((arg) => fcl.arg(UInt64ArgValue(arg), types[arg.type]))),
  ])
  return fcl.decode(response)
}

const proposalKey = (keyHash: string) => {
  return keyHash ? parseInt(process.env[keyHash] || '0') : undefined
}
const networkUrl = (testnet: boolean) => {
  return testnet ? 'https://access-testnet.onflow.org' : 'https://access-mainnet-beta.onflow.org'
}
const UInt64ArgValue = (arg: FlowArgs) => {
  return arg.type === 'UInt64' ? parseInt(arg.value as string) : arg.value
}
const ArrayArgValue = (arg: FlowArgs) => {
  return arg.type === 'Array' ? types[arg.type](types[arg.subType as any]) : types[arg.type]
}
