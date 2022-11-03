import * as elliptic from 'elliptic'
import * as fcl from '@onflow/fcl'
import * as types from '@onflow/types'
import { ECDSA_secp256k1, encodeKey, SHA3_256 } from '@onflow/util-encode-key'
import SHA3 from 'sha3'
import {
  Account,
  AccountAuthorization,
  AccountSignature,
  AccountSigner,
  FlowArgs,
  FlowFromPrivateKeyOrSignatureId,
  Transaction,
  TransactionResult,
} from '../flow.types'
import { flowTxTemplates } from './flow.tx.templates'
import { flowWallet } from './flow.sdk.wallet'
import { flowBlockchain } from './flow.blockchain'
import { FlowSdkError } from '../flow.sdk.errors'
import { SDKArguments, SdkErrorCode } from '@tatumio/shared-abstract-sdk'
import { FLOW_MAINNET_ADDRESSES, FLOW_TESTNET_ADDRESSES } from '../flow.constants'
import { Blockchain } from '@tatumio/shared-core'
import {
  BurnNftFlowPK,
  FlowCustomTransactionPK,
  FlowTransactionPK,
  MintMultipleNftFlowPK,
  MintNftFlowPK,
  TransferNftFlowPK,
} from '@tatumio/api-client'

export type MintFlowNft = FlowFromPrivateKeyOrSignatureId<MintNftFlowPK>
export type MintMultipleFlowNft = FlowFromPrivateKeyOrSignatureId<MintMultipleNftFlowPK>
export type TransferFlowNft = FlowFromPrivateKeyOrSignatureId<TransferNftFlowPK>
export type BurnFlowNft = FlowFromPrivateKeyOrSignatureId<BurnNftFlowPK>
export type TransferFlowCustomTx = FlowFromPrivateKeyOrSignatureId<FlowCustomTransactionPK>
export type TransferFlow = FlowFromPrivateKeyOrSignatureId<FlowTransactionPK>

export const flowTxService = (args: SDKArguments) => {
  const flowSdkWallet = flowWallet()
  const flowSdkBlockchain = flowBlockchain(args)
  const txTemplates = flowTxTemplates()

  const sign = (pk: string, msg: Buffer) => {
    const keyPair = new elliptic.ec('secp256k1').keyFromPrivate(pk)
    const signature = keyPair.sign(new SHA3(256).update(msg).digest())
    const r = signature.r.toArrayLike(Buffer, 'be', 32)
    const s = signature.s.toArrayLike(Buffer, 'be', 32)

    return Buffer.concat([r, s]).toString('hex')
  }

  const getSigner = (pk: string, address: string, keyId = 0) => {
    return {
      signer: async (account: Account): Promise<AccountAuthorization> => {
        return {
          ...account,
          tempId: `${address}-${keyId}`,
          addr: fcl.sansPrefix(address),
          keyId: Number(keyId),
          signingFunction: (data: { message: string }): AccountSignature => {
            return {
              addr: fcl.withPrefix(address),
              keyId: Number(keyId),
              signature: sign(pk, Buffer.from(data.message, 'hex')),
            }
          },
        }
      },
    }
  }

  const getApiSigner = (isPayer: boolean) => {
    const keyHash = Date.now()
    const signer = async (account: Account): Promise<AccountAuthorization> => {
      const { address, keyId } = await flowSdkBlockchain.getSignKey(isPayer)
      if (!isPayer) {
        process.env[`FLOW_PROPOSAL_KEY_${keyHash}`] = `${keyId}`
      }
      return {
        ...account,
        tempId: `${address}-${keyId}`,
        addr: fcl.sansPrefix(address),
        keyId,
        signingFunction: async (data: { message: string }): Promise<AccountSignature> => {
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
  const createAccountFromPublicKey = async (
    testnet: boolean,
    publicKey: string,
    signerAddress: string,
    signerPrivateKey: string,
    proposer?: (isPayer: boolean) => AccountSigner,
    payer?: (isPayer: boolean) => AccountSigner,
  ): Promise<{ txId: string; address: string }> => {
    const code = txTemplates.prepareCreateAccountWithFUSDFromPublicKeyTxTemplate(testnet)
    const encodedPublicKey = encodeKey(publicKey, ECDSA_secp256k1, SHA3_256, 1000)
    const txArgs = [{ type: 'String', value: encodedPublicKey }]
    const auth = getSigner(signerPrivateKey, signerAddress).signer

    const { signer: proposalSigner, keyHash } = proposer ? proposer(false) : getApiSigner(false)
    const { signer: payerSigner } = payer ? payer(true) : getApiSigner(true)

    const result = await _sendTransaction(testnet, {
      code,
      txArgs,
      proposer: proposalSigner,
      authorizations: [auth],
      payer: payerSigner,
      keyHash,
    })
    return {
      txId: result.id,
      address: result.events.find((e: any) => e.type === 'flow.AccountCreated')?.data.address,
    }
  }

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
  const addPublicKeyToAccount = async (
    testnet: boolean,
    publicKey: string,
    signerAddress: string,
    signerPrivateKey: string,
    weight = 0,
    proposer?: (isPayer: boolean) => AccountSigner,
    payer?: (isPayer: boolean) => AccountSigner,
  ): Promise<{ txId: string; address: string }> => {
    const code = txTemplates.prepareAddPublicKeyToAccountTxTemplate()
    const encodedPublicKey = encodeKey(publicKey, ECDSA_secp256k1, SHA3_256, weight)
    const txArgs = [{ type: 'String', value: encodedPublicKey }]
    const auth = getSigner(signerPrivateKey, signerAddress).signer
    const { signer: proposalSigner, keyHash } = proposer ? proposer(false) : getApiSigner(false)
    const { signer: payerSigner } = payer ? payer(true) : getApiSigner(true)

    const result = await _sendTransaction(testnet, {
      code,
      txArgs,
      proposer: proposalSigner,
      authorizations: [auth],
      keyHash,
      payer: payerSigner,
    })
    return { txId: result.id, address: result.events[0].data.address }
  }

  const getNftMetadata = async (testnet: boolean, account: string, id: string, contractAddress: string) => {
    const code = txTemplates.metadataNftTokenScript(testnet)
    const scriptArgs = [
      { type: 'Address', value: account },
      { type: 'UInt64', value: id },
      { type: 'String', value: contractAddress },
    ]
    return sendScript(testnet, code, scriptArgs)
  }

  const getNftTokenByAddress = async (testnet: boolean, account: string, tokenType: string) => {
    const code = txTemplates.tokenByAddressNftTokenScript(testnet)
    const scriptArgs = [
      { type: 'Address', value: account },
      { type: 'String', value: tokenType },
    ]
    return sendScript(testnet, code, scriptArgs)
  }

  /**
   * Send Flow NFT mint token transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
   * This operation is irreversible.
   * @param testnet
   * @param body content of the transaction to broadcast
   * @param proposer function to obtain proposer key from
   * @param payer function to obtain payer key from
   * @returns txId id of the transaction in the blockchain
   */
  const sendNftMintToken = async (
    testnet: boolean,
    body: MintFlowNft,
    proposer?: (isPayer: boolean) => AccountSigner,
    payer?: (isPayer: boolean) => AccountSigner,
  ): Promise<{ txId: string; tokenId: string }> => {
    const bodyWithChain: MintFlowNft = { ...body, chain: Blockchain.FLOW }

    const code = txTemplates.mintNftTokenTxTemplate(testnet)
    const { url, contractAddress: tokenType, to, account } = bodyWithChain
    const txArgs = [
      { type: 'Address', value: to },
      { type: 'String', value: url },
      { type: 'String', value: tokenType },
    ]
    const pk = await getPrivateKey(bodyWithChain)
    if (!pk) throw new FlowSdkError(SdkErrorCode.FLOW_MISSING_PRIVATE_KEY)
    const auth = getSigner(pk, account).signer
    const { signer: proposalSigner, keyHash } = proposer ? proposer(false) : getApiSigner(false)
    const { signer: payerSigner } = payer ? payer(true) : getApiSigner(true)
    const result = await _sendTransaction(testnet, {
      code,
      txArgs,
      proposer: proposalSigner,
      authorizations: [auth],
      keyHash,
      payer: payerSigner,
    })
    return {
      txId: result.id,
      tokenId: `${result.events.find((e: any) => e.type.includes('TatumMultiNFT.Minted'))?.data.id}`,
    }
  }

  /**
   * Send Flow NFT mint multiple tokens transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
   * This operation is irreversible.
   * @param testnet
   * @param body content of the transaction to broadcast
   * @param proposer function to obtain proposer key from
   * @param payer function to obtain payer key from
   * @returns txId id of the transaction in the blockchain
   */
  const sendNftMintMultipleToken = async (
    testnet: boolean,
    body: MintMultipleFlowNft,
    proposer?: (isPayer: boolean) => AccountSigner,
    payer?: (isPayer: boolean) => AccountSigner,
  ): Promise<{ txId: string; tokenId: number[] }> => {
    const bodyWithChain: MintMultipleFlowNft = { ...body, chain: Blockchain.FLOW }
    const code = txTemplates.mintMultipleNftTokenTxTemplate(testnet)
    const { url, contractAddress: tokenType, to, account } = bodyWithChain
    const txArgs = [
      { type: 'Array', subType: 'Address', value: to },
      {
        type: 'Array',
        subType: 'String',
        value: url,
      },
      { type: 'String', value: tokenType },
    ]
    const pk = await getPrivateKey(bodyWithChain)
    if (!pk) throw new FlowSdkError(SdkErrorCode.FLOW_MISSING_PRIVATE_KEY)

    const auth = getSigner(pk, account).signer
    const { signer: proposalSigner, keyHash } = proposer ? proposer(false) : getApiSigner(false)
    const { signer: payerSigner } = payer ? payer(true) : getApiSigner(true)

    const result = await _sendTransaction(testnet, {
      code,
      txArgs,
      proposer: proposalSigner,
      authorizations: [auth],
      payer: payerSigner,
      keyHash,
    })
    return {
      txId: result.id,
      tokenId: result.events
        .filter((e: any) => e.type.includes('TatumMultiNFT.Minted'))
        .map((e) => e.data.id),
    }
  }

  /**
   * Send Flow NFT transfer token transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
   * This operation is irreversible.
   * @param testnet
   * @param body content of the transaction to broadcast
   * @param proposer function to obtain proposer key from
   * @param payer function to obtain payer key from
   * @returns {txId: string, events: any[]} id of the transaction in the blockchain and events this tx produced
   */
  const sendNftTransferToken = async (
    testnet: boolean,
    body: TransferFlowNft,
    proposer?: (isPayer: boolean) => AccountSigner,
    payer?: (isPayer: boolean) => AccountSigner,
  ): Promise<{ txId: string }> => {
    const bodyWithChain: TransferFlowNft = { ...body, chain: Blockchain.FLOW }
    const code = txTemplates.transferNftTokenTxTemplate(testnet)
    const { tokenId, to, account } = bodyWithChain
    const txArgs = [
      { type: 'Address', value: to },
      { type: 'UInt64', value: tokenId },
    ]
    const pk = await getPrivateKey(bodyWithChain)
    if (!pk) throw new FlowSdkError(SdkErrorCode.FLOW_MISSING_PRIVATE_KEY)

    const auth = getSigner(pk, account).signer
    const { signer: proposalSigner, keyHash } = proposer ? proposer(false) : getApiSigner(false)
    const { signer: payerSigner } = payer ? payer(true) : getApiSigner(true)

    const result = await _sendTransaction(testnet, {
      code,
      txArgs,
      proposer: proposalSigner,
      authorizations: [auth],
      payer: payerSigner,
      keyHash,
    })
    return { txId: result.id }
  }

  /**
   * Send Flow NFT burn token transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
   * This operation is irreversible.
   * @param testnet
   * @param body content of the transaction to broadcast
   * @param proposer function to obtain proposer key from
   * @param payer function to obtain payer key from
   * @returns txId id of the transaction in the blockchain
   */
  const sendNftBurnToken = async (
    testnet: boolean,
    body: BurnFlowNft,
    proposer?: (isPayer: boolean) => AccountSigner,
    payer?: (isPayer: boolean) => AccountSigner,
  ): Promise<{ txId: string }> => {
    const bodyWithChain: BurnFlowNft = { ...body, chain: Blockchain.FLOW }

    const code = txTemplates.burnNftTokenTxTemplate(testnet)
    const { tokenId, contractAddress: tokenType, account } = bodyWithChain
    const txArgs = [
      { type: 'UInt64', value: tokenId },
      { type: 'String', value: tokenType },
    ]
    const pk = await getPrivateKey(bodyWithChain)
    if (!pk) throw new FlowSdkError(SdkErrorCode.FLOW_MISSING_PRIVATE_KEY)

    const auth = getSigner(pk, account).signer
    const { signer: proposalSigner, keyHash } = proposer ? proposer(false) : getApiSigner(false)
    const { signer: payerSigner } = payer ? payer(true) : getApiSigner(true)

    const result = await _sendTransaction(testnet, {
      code,
      txArgs,
      proposer: proposalSigner,
      authorizations: [auth],
      payer: payerSigner,
      keyHash,
    })
    return { txId: result.id }
  }

  /**
   * Send custom transaction to the FLOW network
   * @param testnet
   * @param body content of the transaction to broadcast
   * @param proposer function to obtain proposer key from
   * @param payer function to obtain payer key from
   * @returns txId id of the transaction in the blockchain
   */
  const sendCustomTransaction = async (
    testnet: boolean,
    body: TransferFlowCustomTx,
    proposer?: (isPayer: boolean) => AccountSigner,
    payer?: (isPayer: boolean) => AccountSigner,
  ): Promise<{ txId: string; events: any[] }> => {
    const pk = await getPrivateKey(body)
    if (!pk) throw new FlowSdkError(SdkErrorCode.FLOW_MISSING_PRIVATE_KEY)

    const auth = getSigner(pk, body.account).signer
    const { signer: proposalSigner, keyHash } = proposer ? proposer(false) : getApiSigner(false)
    const { signer: payerSigner } = payer ? payer(true) : getApiSigner(true)

    const result = await _sendTransaction(testnet, {
      code: body.transaction,
      txArgs: body.args,
      proposer: proposalSigner,
      authorizations: [auth],
      keyHash,
      payer: payerSigner,
    })
    return { txId: result.id, events: result.events }
  }

  /**
   * Send FLOW or FUSD from account to account.
   * @param testnet
   * @param body content of the transaction to broadcast
   * @param proposer function to obtain proposer key from
   * @param payer function to obtain payer key from
   * @returns txId id of the transaction in the blockchain
   */
  const sendTransaction = async (
    testnet: boolean,
    body: TransferFlow,
    proposer?: (isPayer: boolean) => AccountSigner,
    payer?: (isPayer: boolean) => AccountSigner,
  ): Promise<{ txId: string }> => {
    let tokenAddress
    let tokenName
    let tokenStorage
    if (body.currency === Blockchain.FLOW) {
      tokenAddress = testnet ? FLOW_TESTNET_ADDRESSES.FlowToken : FLOW_MAINNET_ADDRESSES.FlowToken
      tokenName = 'FlowToken'
      tokenStorage = 'flowToken'
    } else {
      tokenAddress = testnet ? FLOW_TESTNET_ADDRESSES.FUSD : FLOW_MAINNET_ADDRESSES.FUSD
      tokenName = 'FUSD'
      tokenStorage = 'fusd'
    }
    const code = txTemplates.prepareTransferTxTemplate(testnet, tokenAddress, tokenName, tokenStorage)
    const txArgs = [
      { value: parseFloat(body.amount).toFixed(8), type: 'UFix64' },
      { value: body.to, type: 'Address' },
    ]
    const pk = await getPrivateKey(body)
    if (!pk) throw new FlowSdkError(SdkErrorCode.FLOW_MISSING_PRIVATE_KEY)

    const auth = getSigner(pk, body.account).signer
    const { signer: proposalSigner, keyHash } = proposer ? proposer(false) : getApiSigner(false)
    const { signer: payerSigner } = payer ? payer(true) : getApiSigner(true)

    const result = await _sendTransaction(testnet, {
      code,
      txArgs,
      proposer: proposalSigner,
      authorizations: [auth],
      payer: payerSigner,
      keyHash,
    })
    return { txId: result.id }
  }

  return {
    sign,
    getSigner,
    getApiSigner,
    createAccountFromPublicKey,
    addPublicKeyToAccount,
    nft: {
      getNftMetadata,
      getNftTokenByAddress,
      sendNftMintToken,
      sendNftMintMultipleToken,
      sendNftTransferToken,
      sendNftBurnToken,
    },
    sendCustomTransaction,
    sendTransaction,
  }

  async function _sendTransaction(
    testnet: boolean,
    { code, txArgs, proposer, authorizations, payer, keyHash }: Transaction,
  ): Promise<TransactionResult> {
    fcl.config().put('accessNode.api', networkUrl(testnet))
    let response
    try {
      response = await fcl.send([
        fcl.transaction(code),
        fcl.args(txArgs.map((arg) => fcl.arg(UInt64ArgValue(arg), ArrayArgValue(arg)))),
        fcl.proposer(proposer),
        fcl.authorizations(authorizations),
        fcl.payer(payer),
        fcl.limit(1000),
      ])
    } catch (e) {
      try {
        if (keyHash) {
          await flowSdkBlockchain.broadcast('', undefined, proposalKey(keyHash))
          delete process.env[keyHash]
        }
      } catch (_) {
        throw new FlowSdkError(_)
      }
      throw new FlowSdkError(e)
    }

    const { transactionId } = response
    try {
      const { error, events } = await fcl.tx(response).onceSealed()
      if (error) {
        throw new FlowSdkError(error)
      }
      return {
        id: transactionId,
        events,
      }
    } catch (e) {
      throw new FlowSdkError(e)
    } finally {
      if (keyHash) {
        await flowSdkBlockchain.broadcast(transactionId, undefined, proposalKey(keyHash))
        delete process.env[keyHash]
      }
    }
  }
  async function getPrivateKey(body: FlowFromPrivateKeyOrSignatureId<{ privateKey: string }>) {
    const { mnemonic, index, privateKey } = body
    if (privateKey) {
      return privateKey
    } else {
      if (mnemonic && index && index >= 0) {
        return flowSdkWallet.generatePrivateKeyFromMnemonic(mnemonic, index)
      } else throw new FlowSdkError(SdkErrorCode.FLOW_MISSING_MNEMONIC)
    }
  }

  async function sendScript(testnet: boolean, code: string, scriptArgs: FlowArgs[]) {
    fcl.config().put('accessNode.api', networkUrl(testnet))
    const response = await fcl.send([
      fcl.script(code),
      fcl.args(scriptArgs.map((arg) => fcl.arg(UInt64ArgValue(arg), types[arg.type]))),
    ])
    return fcl.decode(response)
  }

  function proposalKey(keyHash: string) {
    return keyHash ? parseInt(process.env[keyHash] || '0') : undefined
  }
  function networkUrl(testnet: boolean) {
    return testnet ? 'https://access-testnet.onflow.org' : 'https://access-mainnet-beta.onflow.org'
  }
  function UInt64ArgValue(arg: FlowArgs) {
    return arg.type === 'UInt64' ? parseInt(arg.value as string) : arg.value
  }
  function ArrayArgValue(arg: FlowArgs) {
    return arg.type === 'Array' ? types[arg.type](types[arg.subType as any]) : types[arg.type]
  }
}
