import { AccountSigner } from '../flow.types'
import { flowTxTemplates } from './flow.tx.templates'
import { FlowSdkError } from '../flow.sdk.errors'
import { SdkErrorCode } from '@tatumio/shared-abstract-sdk'
import { Blockchain } from '@tatumio/shared-core'
import {
  BurnNftFlowKMS,
  MintMultipleNftFlowKMS,
  MintNftFlowKMS,
  NftErc721OrCompatibleService,
  TransferNftFlowKMS,
} from '@tatumio/api-client'
import { FlowProvider } from './flow.provider'
import {
  BurnFlowNft,
  flowUtils,
  MintFlowNft,
  MintMultipleFlowNft,
  TransferFlowNft,
} from '../utils/flow.utils'

export const flowNftService = (
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
  const txTemplates = flowTxTemplates()

  const getNftMetadata = async (account: string, id: string, contractAddress: string) => {
    const code = txTemplates.metadataNftTokenScript(provider.isTestnet())
    const scriptArgs = [
      { type: 'Address', value: account },
      { type: 'UInt64', value: id },
      { type: 'String', value: contractAddress },
    ]
    return flowUtils.sendScript(code, scriptArgs, provider.getProvider())
  }

  const getNftTokenByAddress = async (account: string, tokenType: string) => {
    const code = txTemplates.tokenByAddressNftTokenScript(provider.isTestnet())
    const scriptArgs = [
      { type: 'Address', value: account },
      { type: 'String', value: tokenType },
    ]
    return flowUtils.sendScript(code, scriptArgs, provider.getProvider())
  }

  const mintSignedTransaction = async (
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
    const pk = await flowUtils.getPrivateKey(bodyWithChain)
    if (!pk) throw new FlowSdkError({ code: SdkErrorCode.FLOW_MISSING_PRIVATE_KEY })
    const auth = flowUtils.getSigner(pk, account).signer
    const { signer: proposalSigner, keyHash } = proposer
      ? proposer(false)
      : flowUtils.getApiSigner(apiCalls, false)
    const { signer: payerSigner } = payer ? payer(true) : flowUtils.getApiSigner(apiCalls, true)
    const result = await flowUtils.sendTransaction(
      apiCalls,
      {
        code,
        txArgs,
        proposer: proposalSigner,
        authorizations: [auth],
        keyHash,
        payer: payerSigner,
      },
      provider.getProvider(),
    )
    return {
      txId: result.id,
      tokenId: `${result.events.find((e: any) => e.type.includes('TatumMultiNFT.Minted'))?.data.id}`,
    }
  }

  const mintMultipleSignedTransaction = async (
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
    const pk = await flowUtils.getPrivateKey(bodyWithChain)
    if (!pk) throw new FlowSdkError({ code: SdkErrorCode.FLOW_MISSING_PRIVATE_KEY })

    const auth = flowUtils.getSigner(pk, account).signer
    const { signer: proposalSigner, keyHash } = proposer
      ? proposer(false)
      : flowUtils.getApiSigner(apiCalls, false)
    const { signer: payerSigner } = payer ? payer(true) : flowUtils.getApiSigner(apiCalls, true)

    const result = await flowUtils.sendTransaction(
      apiCalls,
      {
        code,
        txArgs,
        proposer: proposalSigner,
        authorizations: [auth],
        payer: payerSigner,
        keyHash,
      },
      provider.getProvider(),
    )
    return {
      txId: result.id,
      tokenId: result.events
        .filter((e: any) => e.type.includes('TatumMultiNFT.Minted'))
        .map((e) => e.data.id),
    }
  }

  const transferSignedTransaction = async (
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
    const pk = await flowUtils.getPrivateKey(bodyWithChain)
    if (!pk) throw new FlowSdkError({ code: SdkErrorCode.FLOW_MISSING_PRIVATE_KEY })

    const auth = flowUtils.getSigner(pk, account).signer
    const { signer: proposalSigner, keyHash } = proposer
      ? proposer(false)
      : flowUtils.getApiSigner(apiCalls, false)
    const { signer: payerSigner } = payer ? payer(true) : flowUtils.getApiSigner(apiCalls, true)

    const result = await flowUtils.sendTransaction(
      apiCalls,
      {
        code,
        txArgs,
        proposer: proposalSigner,
        authorizations: [auth],
        payer: payerSigner,
        keyHash,
      },
      provider.getProvider(),
    )
    return { txId: result.id }
  }

  const burnSignedTransaction = async (
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
    const pk = await flowUtils.getPrivateKey(bodyWithChain)
    if (!pk) throw new FlowSdkError({ code: SdkErrorCode.FLOW_MISSING_PRIVATE_KEY })

    const auth = flowUtils.getSigner(pk, account).signer
    const { signer: proposalSigner, keyHash } = proposer
      ? proposer(false)
      : flowUtils.getApiSigner(apiCalls, false)
    const { signer: payerSigner } = payer ? payer(true) : flowUtils.getApiSigner(apiCalls, true)

    const result = await flowUtils.sendTransaction(
      apiCalls,
      {
        code,
        txArgs,
        proposer: proposalSigner,
        authorizations: [auth],
        payer: payerSigner,
        keyHash,
      },
      provider.getProvider(),
    )
    return { txId: result.id }
  }

  return {
    getNftMetadata,
    getNftTokenByAddress,
    send: {
      /**
       * Send Flow NFT mint token transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
       * This operation is irreversible.
       * @param body content of the transaction to broadcast
       * @param proposer function to obtain proposer key from
       * @param payer function to obtain payer key from
       * @returns txId id of the transaction in the blockchain
       */
      mintSignedTransaction: async (
        body: MintFlowNft,
        proposer?: (isPayer: boolean) => AccountSigner,
        payer?: (isPayer: boolean) => AccountSigner,
      ) => {
        if (body.signatureId) {
          return NftErc721OrCompatibleService.nftMintErc721(body as MintNftFlowKMS)
        }
        return mintSignedTransaction(body, proposer, payer)
      },
      /**
       * Send Flow NFT mint multiple tokens transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
       * This operation is irreversible.
       * @param body content of the transaction to broadcast
       * @param proposer function to obtain proposer key from
       * @param payer function to obtain payer key from
       * @returns txId id of the transaction in the blockchain
       */
      mintMultipleSignedTransaction: async (
        body: MintMultipleFlowNft,
        proposer?: (isPayer: boolean) => AccountSigner,
        payer?: (isPayer: boolean) => AccountSigner,
      ) => {
        if (body.signatureId) {
          return NftErc721OrCompatibleService.nftMintMultipleErc721(body as MintMultipleNftFlowKMS)
        }
        return mintMultipleSignedTransaction(body, proposer, payer)
      },
      /**
       * Send Flow NFT transfer token transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
       * This operation is irreversible.
       * @param body content of the transaction to broadcast
       * @param proposer function to obtain proposer key from
       * @param payer function to obtain payer key from
       * @returns {txId: string, events: any[]} id of the transaction in the blockchain and events this tx produced
       */
      transferSignedTransaction: async (
        body: TransferFlowNft,
        proposer?: (isPayer: boolean) => AccountSigner,
        payer?: (isPayer: boolean) => AccountSigner,
      ) => {
        if (body.signatureId) {
          return NftErc721OrCompatibleService.nftTransferErc721(body as TransferNftFlowKMS)
        }
        return transferSignedTransaction(body, proposer, payer)
      },
      /**
       * Send Flow NFT burn token transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
       * This operation is irreversible.
       * @param body content of the transaction to broadcast
       * @param proposer function to obtain proposer key from
       * @param payer function to obtain payer key from
       * @returns txId id of the transaction in the blockchain
       */
      burnSignedTransaction: async (
        body: BurnFlowNft,
        proposer?: (isPayer: boolean) => AccountSigner,
        payer?: (isPayer: boolean) => AccountSigner,
      ) => {
        if (body.signatureId) {
          return NftErc721OrCompatibleService.nftBurnErc721(body as BurnNftFlowKMS)
        }
        return burnSignedTransaction(body, proposer, payer)
      },
    },
  }
}
