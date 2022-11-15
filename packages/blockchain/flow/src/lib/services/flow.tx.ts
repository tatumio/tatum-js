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
  FixedFlowCustomTransactionPK,
  FlowArgs,
  FlowPrivateKeyOrSignatureId,
  Transaction,
  TransactionResult,
} from '../flow.types'
import { flowTxTemplates } from './flow.tx.templates'
import { flowWallet } from './flow.sdk.wallet'
import { FlowSdkError } from '../flow.sdk.errors'
import { SdkErrorCode } from '@tatumio/shared-abstract-sdk'
import { FLOW_MAINNET_ADDRESSES, FLOW_TESTNET_ADDRESSES } from '../flow.constants'
import { Blockchain } from '@tatumio/shared-core'
import {
  ApiServices,
  BurnNftFlowKMS,
  BurnNftFlowPK,
  FlowCreateAddressFromPubKeyKMS,
  FlowCreateAddressFromPubKeySecret,
  FlowCustomTransactionKMS,
  FlowTransactionKMS,
  FlowTransactionPK,
  MintMultipleNftFlowKMS,
  MintMultipleNftFlowPK,
  MintNftFlowKMS,
  MintNftFlowPK,
  NftErc721OrCompatibleService,
  TransferNftFlowKMS,
  TransferNftFlowPK,
} from '@tatumio/api-client'
import BigNumber from 'bignumber.js'
import _ from 'lodash'
import { FlowProvider } from './flow.provider'

export type MintFlowNft = FlowPrivateKeyOrSignatureId<MintNftFlowPK>
export type MintMultipleFlowNft = FlowPrivateKeyOrSignatureId<MintMultipleNftFlowPK>
export type TransferFlowNft = FlowPrivateKeyOrSignatureId<TransferNftFlowPK>
export type BurnFlowNft = FlowPrivateKeyOrSignatureId<BurnNftFlowPK>
export type TransferFlowCustomTx = FlowPrivateKeyOrSignatureId<FixedFlowCustomTransactionPK>
export type TransferFlow = FlowPrivateKeyOrSignatureId<FlowTransactionPK>
export type CreateAddressFromPubKey = FlowPrivateKeyOrSignatureId<FlowCreateAddressFromPubKeySecret>

export const flowTxService = (
  provider: FlowProvider,
  apiCalls: {
    getSignKey: (isPayer: boolean) => Promise<{ keyId: number; address: string }>
    signWithKey: (data: string, isPayer: boolean) => Promise<{ signature: string }>
    broadcast: (
      txData: string,
      signatureId?: string,
      proposalKey?: number,
    ) => Promise<{ txId: string; failed?: boolean }>
  },
) => {
  const flowSdkWallet = flowWallet()
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
    const keyHash = _.uniqueId(`FLOW_PROPOSAL_KEY_`)

    const signer = async (account: Account): Promise<AccountAuthorization> => {
      const { address, keyId } = await getProposalKeyOrFetch(keyHash, isPayer)
      if (!isPayer) {
        storeProposalKey(keyHash, address, keyId)
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
            signature: (await apiCalls.signWithKey(data.message, isPayer)).signature,
          }
        },
      }
    }
    return { signer, keyHash: keyHash }
  }

  const sendCreateAccountFromPublicKey = async (
    body: CreateAddressFromPubKey,
    proposer?: (isPayer: boolean) => AccountSigner,
    payer?: (isPayer: boolean) => AccountSigner,
  ): Promise<{ txId: string; address: string }> => {
    const code = txTemplates.prepareCreateAccountWithFUSDFromPublicKeyTxTemplate(provider.isTestnet())
    const encodedPublicKey = encodeKey(body.publicKey, ECDSA_secp256k1, SHA3_256, 1000)
    const txArgs = [{ type: 'String', value: encodedPublicKey }]

    const pk = await getPrivateKey(body)
    if (!pk) throw new FlowSdkError({ code: SdkErrorCode.FLOW_MISSING_PRIVATE_KEY })

    const auth = getSigner(pk, body.account).signer

    const { signer: proposalSigner, keyHash } = proposer ? proposer(false) : getApiSigner(false)
    const { signer: payerSigner } = payer ? payer(true) : getApiSigner(true)

    const result = await _sendTransaction({
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

  const sendAddPublicKeyToAccount = async (
    body: CreateAddressFromPubKey,
    proposer?: (isPayer: boolean) => AccountSigner,
    payer?: (isPayer: boolean) => AccountSigner,
  ): Promise<{ txId: string; address: string }> => {
    const code = txTemplates.prepareAddPublicKeyToAccountTxTemplate()
    const encodedPublicKey = encodeKey(body.publicKey, ECDSA_secp256k1, SHA3_256, body.weight || 0)
    const txArgs = [{ type: 'String', value: encodedPublicKey }]

    const pk = await getPrivateKey(body)
    if (!pk) throw new FlowSdkError({ code: SdkErrorCode.FLOW_MISSING_PRIVATE_KEY })

    const auth = getSigner(pk, body.account).signer
    const { signer: proposalSigner, keyHash } = proposer ? proposer(false) : getApiSigner(false)
    const { signer: payerSigner } = payer ? payer(true) : getApiSigner(true)

    const result = await _sendTransaction({
      code,
      txArgs,
      proposer: proposalSigner,
      authorizations: [auth],
      keyHash,
      payer: payerSigner,
    })
    return { txId: result.id, address: result.events[0].data.address }
  }

  const getNftMetadata = async (account: string, id: string, contractAddress: string) => {
    const code = txTemplates.metadataNftTokenScript(provider.isTestnet())
    const scriptArgs = [
      { type: 'Address', value: account },
      { type: 'UInt64', value: id },
      { type: 'String', value: contractAddress },
    ]
    return sendScript(code, scriptArgs)
  }

  const getNftTokenByAddress = async (account: string, tokenType: string) => {
    const code = txTemplates.tokenByAddressNftTokenScript(provider.isTestnet())
    const scriptArgs = [
      { type: 'Address', value: account },
      { type: 'String', value: tokenType },
    ]
    return sendScript(code, scriptArgs)
  }

  const sendNftMintToken = async (
    body: MintFlowNft,
    proposer?: (isPayer: boolean) => AccountSigner,
    payer?: (isPayer: boolean) => AccountSigner,
  ): Promise<{ txId: string; tokenId: string }> => {
    const bodyWithChain: MintFlowNft = { ...body, chain: Blockchain.FLOW }

    const code = txTemplates.mintNftTokenTxTemplate(provider.isTestnet())
    const { url, contractAddress: tokenType, to, account } = bodyWithChain
    const txArgs = [
      { type: 'Address', value: to },
      { type: 'String', value: url },
      { type: 'String', value: tokenType },
    ]
    const pk = await getPrivateKey(bodyWithChain)
    if (!pk) throw new FlowSdkError({ code: SdkErrorCode.FLOW_MISSING_PRIVATE_KEY })
    const auth = getSigner(pk, account).signer
    const { signer: proposalSigner, keyHash } = proposer ? proposer(false) : getApiSigner(false)
    const { signer: payerSigner } = payer ? payer(true) : getApiSigner(true)
    const result = await _sendTransaction({
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

  const sendNftMintMultipleToken = async (
    body: MintMultipleFlowNft,
    proposer?: (isPayer: boolean) => AccountSigner,
    payer?: (isPayer: boolean) => AccountSigner,
  ): Promise<{ txId: string; tokenId: number[] }> => {
    const bodyWithChain: MintMultipleFlowNft = { ...body, chain: Blockchain.FLOW }
    const code = txTemplates.mintMultipleNftTokenTxTemplate(provider.isTestnet())
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
    if (!pk) throw new FlowSdkError({ code: SdkErrorCode.FLOW_MISSING_PRIVATE_KEY })

    const auth = getSigner(pk, account).signer
    const { signer: proposalSigner, keyHash } = proposer ? proposer(false) : getApiSigner(false)
    const { signer: payerSigner } = payer ? payer(true) : getApiSigner(true)

    const result = await _sendTransaction({
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

  const sendNftTransferToken = async (
    body: TransferFlowNft,
    proposer?: (isPayer: boolean) => AccountSigner,
    payer?: (isPayer: boolean) => AccountSigner,
  ): Promise<{ txId: string }> => {
    const bodyWithChain: TransferFlowNft = { ...body, chain: Blockchain.FLOW }
    const code = txTemplates.transferNftTokenTxTemplate(provider.isTestnet())
    const { tokenId, to, account } = bodyWithChain
    const txArgs = [
      { type: 'Address', value: to },
      { type: 'UInt64', value: tokenId },
    ]
    const pk = await getPrivateKey(bodyWithChain)
    if (!pk) throw new FlowSdkError({ code: SdkErrorCode.FLOW_MISSING_PRIVATE_KEY })

    const auth = getSigner(pk, account).signer
    const { signer: proposalSigner, keyHash } = proposer ? proposer(false) : getApiSigner(false)
    const { signer: payerSigner } = payer ? payer(true) : getApiSigner(true)

    const result = await _sendTransaction({
      code,
      txArgs,
      proposer: proposalSigner,
      authorizations: [auth],
      payer: payerSigner,
      keyHash,
    })
    return { txId: result.id }
  }

  const sendNftBurnToken = async (
    body: BurnFlowNft,
    proposer?: (isPayer: boolean) => AccountSigner,
    payer?: (isPayer: boolean) => AccountSigner,
  ): Promise<{ txId: string }> => {
    const bodyWithChain: BurnFlowNft = { ...body, chain: Blockchain.FLOW }

    const code = txTemplates.burnNftTokenTxTemplate(provider.isTestnet())
    const { tokenId, contractAddress: tokenType, account } = bodyWithChain
    const txArgs = [
      { type: 'UInt64', value: tokenId },
      { type: 'String', value: tokenType },
    ]
    const pk = await getPrivateKey(bodyWithChain)
    if (!pk) throw new FlowSdkError({ code: SdkErrorCode.FLOW_MISSING_PRIVATE_KEY })

    const auth = getSigner(pk, account).signer
    const { signer: proposalSigner, keyHash } = proposer ? proposer(false) : getApiSigner(false)
    const { signer: payerSigner } = payer ? payer(true) : getApiSigner(true)

    const result = await _sendTransaction({
      code,
      txArgs,
      proposer: proposalSigner,
      authorizations: [auth],
      payer: payerSigner,
      keyHash,
    })
    return { txId: result.id }
  }

  const sendCustomTransaction = async (
    body: TransferFlowCustomTx,
    proposer?: (isPayer: boolean) => AccountSigner,
    payer?: (isPayer: boolean) => AccountSigner,
  ): Promise<{ txId: string; events: any[] }> => {
    const pk = await getPrivateKey(body)
    if (!pk) throw new FlowSdkError({ code: SdkErrorCode.FLOW_MISSING_PRIVATE_KEY })

    const auth = getSigner(pk, body.account).signer
    const { signer: proposalSigner, keyHash } = proposer ? proposer(false) : getApiSigner(false)
    const { signer: payerSigner } = payer ? payer(true) : getApiSigner(true)

    const result = await _sendTransaction({
      code: body.transaction,
      txArgs: body.args,
      proposer: proposalSigner,
      authorizations: [auth],
      keyHash,
      payer: payerSigner,
    })
    return { txId: result.id, events: result.events }
  }

  const sendTransaction = async (
    body: TransferFlow,
    proposer?: (isPayer: boolean) => AccountSigner,
    payer?: (isPayer: boolean) => AccountSigner,
  ): Promise<{ txId: string }> => {
    const testnet = provider.isTestnet()

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
    if (!pk) throw new FlowSdkError({ code: SdkErrorCode.FLOW_MISSING_PRIVATE_KEY })

    await checkBalanceOrThrow(body.account, tokenAddress, tokenName, tokenStorage, body.amount)

    const auth = getSigner(pk, body.account).signer
    const { signer: proposalSigner, keyHash } = proposer ? proposer(false) : getApiSigner(false)
    const { signer: payerSigner } = payer ? payer(true) : getApiSigner(true)

    const result = await _sendTransaction({
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
    /**
     * Create account on the FLOW network. It automatically creates 100 0-weight proposal keys, which are managed by Tatum API - index 1-100.
     * Main 1000 weight authorizer key is stored as a first one on index 0.
     * @param body content of the transaction to broadcast
     * @param proposer function to obtain proposer key from
     * @param payer function to obtain payer key from
     */
    createAccountFromPublicKey: async (
      body: CreateAddressFromPubKey,
      proposer?: (isPayer: boolean) => AccountSigner,
      payer?: (isPayer: boolean) => AccountSigner,
    ) => {
      if (body.signatureId) {
        return ApiServices.blockchain.flow.flowCreateAddressFromPubKey(body as FlowCreateAddressFromPubKeyKMS)
      }
      return sendCreateAccountFromPublicKey(body, proposer, payer)
    },
    /**
     * Add public key to existing blockchain address with defined weight
     * @param body content of the transaction to broadcast
     * @param proposer function to obtain proposer key from
     * @param payer function to obtain payer key from
     */
    addPublicKeyToAccount: async (
      body: CreateAddressFromPubKey,
      proposer?: (isPayer: boolean) => AccountSigner,
      payer?: (isPayer: boolean) => AccountSigner,
    ) => {
      if (body.signatureId) {
        return ApiServices.blockchain.flow.flowAddPubKeyToAddress(body as FlowCreateAddressFromPubKeyKMS)
      }
      return sendAddPublicKeyToAccount(body, proposer, payer)
    },
    nft: {
      getNftMetadata,
      getNftTokenByAddress,
      /**
       * Send Flow NFT mint token transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
       * This operation is irreversible.
       * @param body content of the transaction to broadcast
       * @param proposer function to obtain proposer key from
       * @param payer function to obtain payer key from
       * @returns txId id of the transaction in the blockchain
       */
      sendNftMintToken: async (
        body: MintFlowNft,
        proposer?: (isPayer: boolean) => AccountSigner,
        payer?: (isPayer: boolean) => AccountSigner,
      ) => {
        if (body.signatureId) {
          return NftErc721OrCompatibleService.nftMintErc721(body as MintNftFlowKMS)
        }
        return sendNftMintToken(body, proposer, payer)
      },
      /**
       * Send Flow NFT mint multiple tokens transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
       * This operation is irreversible.
       * @param body content of the transaction to broadcast
       * @param proposer function to obtain proposer key from
       * @param payer function to obtain payer key from
       * @returns txId id of the transaction in the blockchain
       */
      sendNftMintMultipleToken: async (
        body: MintMultipleFlowNft,
        proposer?: (isPayer: boolean) => AccountSigner,
        payer?: (isPayer: boolean) => AccountSigner,
      ) => {
        if (body.signatureId) {
          return NftErc721OrCompatibleService.nftMintMultipleErc721(body as MintMultipleNftFlowKMS)
        }
        return sendNftMintMultipleToken(body, proposer, payer)
      },
      /**
       * Send Flow NFT transfer token transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
       * This operation is irreversible.
       * @param body content of the transaction to broadcast
       * @param proposer function to obtain proposer key from
       * @param payer function to obtain payer key from
       * @returns {txId: string, events: any[]} id of the transaction in the blockchain and events this tx produced
       */
      sendNftTransferToken: async (
        body: TransferFlowNft,
        proposer?: (isPayer: boolean) => AccountSigner,
        payer?: (isPayer: boolean) => AccountSigner,
      ) => {
        if (body.signatureId) {
          return NftErc721OrCompatibleService.nftTransferErc721(body as TransferNftFlowKMS)
        }
        return sendNftTransferToken(body, proposer, payer)
      },
      /**
       * Send Flow NFT burn token transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
       * This operation is irreversible.
       * @param body content of the transaction to broadcast
       * @param proposer function to obtain proposer key from
       * @param payer function to obtain payer key from
       * @returns txId id of the transaction in the blockchain
       */
      sendNftBurnToken: async (
        body: BurnFlowNft,
        proposer?: (isPayer: boolean) => AccountSigner,
        payer?: (isPayer: boolean) => AccountSigner,
      ) => {
        if (body.signatureId) {
          return NftErc721OrCompatibleService.nftBurnErc721(body as BurnNftFlowKMS)
        }
        return sendNftBurnToken(body, proposer, payer)
      },
    },
    /**
     * Send FLOW or FUSD from account to account.
     * @param body content of the transaction to broadcast
     * @param proposer function to obtain proposer key from
     * @param payer function to obtain payer key from
     * @returns txId id of the transaction in the blockchain
     */
    sendTransaction: async (
      body: TransferFlow,
      proposer?: (isPayer: boolean) => AccountSigner,
      payer?: (isPayer: boolean) => AccountSigner,
    ) => {
      if (body.signatureId) {
        return ApiServices.blockchain.flow.flowTransferBlockchain(body as FlowTransactionKMS)
      }
      return sendTransaction(body, proposer, payer)
    },
    /**
     * Send custom transaction to the FLOW network
     * @param body content of the transaction to broadcast
     * @param proposer function to obtain proposer key from
     * @param payer function to obtain payer key from
     * @returns txId id of the transaction in the blockchain
     */
    sendCustomTransaction: async (
      body: TransferFlowCustomTx,
      proposer?: (isPayer: boolean) => AccountSigner,
      payer?: (isPayer: boolean) => AccountSigner,
    ) => {
      if (body.signatureId) {
        return ApiServices.blockchain.flow.flowTransferCustomBlockchain(body as FlowCustomTransactionKMS)
      }
      return sendCustomTransaction(body, proposer, payer)
    },

    templates: {
      ...txTemplates,
    },
  }

  async function _sendTransaction({
    code,
    txArgs,
    proposer,
    authorizations,
    payer,
    keyHash,
  }: Transaction): Promise<TransactionResult> {
    fcl.config().put('accessNode.api', provider.getProvider())
    let response
    try {
      response = await fcl.send([
        fcl.transaction(code),
        fcl.args(txArgs.map((arg) => fcl.arg(arg.value, ArrayArgValue(arg)))),
        fcl.proposer(proposer),
        fcl.authorizations(authorizations),
        fcl.payer(payer),
        fcl.limit(1000),
      ])
    } catch (e) {
      await unlockProposalKey(keyHash)
      throw new FlowSdkError({ error: e as Error })
    }

    const { transactionId } = response
    try {
      const { error, events } = await fcl.tx(response).onceSealed()
      if (error) {
        throw new FlowSdkError({ error: error })
      }
      return {
        id: transactionId,
        events,
      }
    } catch (e) {
      throw new FlowSdkError({ error: e as Error })
    } finally {
      await unlockProposalKey(keyHash)
    }
  }

  async function checkBalanceOrThrow(
    account: string,
    tokenAddress: string,
    tokenName: string,
    tokenStorage: string,
    amount: string,
  ) {
    const balanceTx = txTemplates.prepareBalanceTxTemplate(
      provider.isTestnet(),
      tokenAddress,
      tokenName,
      tokenStorage,
    )
    const balanceArgs = [{ value: account, type: 'Address' }]

    let result

    try {
      result = await sendScript(balanceTx, balanceArgs)
    } catch (_e) {
      console.error(_e)
    }

    if (result) {
      if (new BigNumber(result).lt(new BigNumber(amount))) {
        throw new FlowSdkError({
          code: SdkErrorCode.INSUFFICIENT_FUNDS,
          error: new Error(
            `Insufficient funds. Balance: ${result} on account ${account} is less than ${amount.toString()}`,
          ),
        })
      }
    }
  }

  async function getPrivateKey(body: FlowPrivateKeyOrSignatureId<{ privateKey: string }>) {
    const { mnemonic, index, privateKey } = body
    if (privateKey) {
      return privateKey
    } else {
      if (mnemonic && !_.isNil(index) && index >= 0) {
        return flowSdkWallet.generatePrivateKeyFromMnemonic(mnemonic, index)
      } else throw new FlowSdkError({ code: SdkErrorCode.FLOW_MISSING_MNEMONIC })
    }
  }

  async function sendScript(code: string, scriptArgs: FlowArgs[]) {
    fcl.config().put('accessNode.api', provider.getProvider())
    const response = await fcl.send([
      fcl.script(code),
      fcl.args(scriptArgs.map((arg) => fcl.arg(arg.value, types[arg.type]))),
    ])
    return fcl.decode(response)
  }

  async function getProposalKeyOrFetch(
    keyHash: string,
    isPayer: boolean,
  ): Promise<{ address: string; keyId: number }> {
    const value = process.env[keyHash]

    if (value) {
      return JSON.parse(value)
    } else {
      return apiCalls.getSignKey(isPayer)
    }
  }

  function storeProposalKey(keyHash: string, address: string, keyId: number) {
    process.env[keyHash] = JSON.stringify({ address, keyId })
  }

  function proposalKey(keyHash: string): { address: string; keyId: number } | undefined {
    const value = process.env[keyHash]
    if (!value) return undefined
    return keyHash ? JSON.parse(value) : undefined
  }

  function ArrayArgValue(arg: FlowArgs) {
    return arg.type === 'Array' ? types[arg.type](types[arg.subType as any]) : types[arg.type]
  }

  async function unlockProposalKey(keyHash?: string) {
    try {
      if (keyHash) {
        const key = proposalKey(keyHash)
        if (key) {
          await apiCalls.broadcast('', undefined, key.keyId)
          delete process.env[keyHash]
        }
      }
    } catch (e) {
      throw new FlowSdkError({ error: e as Error })
    }
  }
}
