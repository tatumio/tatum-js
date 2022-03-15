import {
  ApproveErc20,
  BlockchainMarketplaceService,
  BroadcastKMS,
  BurnMultiToken,
  BurnMultiTokenBatch,
  BurnNft,
  CallReadSmartContractMethod,
  CallSmartContractMethod,
  BuyAssetOnMarketplace,
  CancelablePromise,
  CancelSellAssetOnMarketplace,
  ChainBurnErc20 as ApiChainBurnErc20,
  ChainMintErc20 as ApiChainMintErc20,
  ChainTransferEthErc20,
  DeployErc20,
  DeployMultiToken,
  DeployNft,
  ExchangeRate,
  GenerateCustodialWallet,
  Fiat,
  GenerateMarketplace,
  MintErc721,
  MintMultipleNft,
  MintMultiToken,
  MintMultiTokenBatch,
  MintNft,
  SellAssetOnMarketplace,
  SignatureId,
  TatumServiceService,
  TatumUrl,
  TransactionHashKMS,
  TransferMultiToken,
  TransferMultiTokenBatch,
  TransferNft,
  TransferPolygonBlockchain,
  TronWallet,
  UpdateCashbackValueForAuthorNft,
  UpdateFee,
  UpdateFeeRecipient,
  XlmWallet,
  XrpWallet,
  TransferCustodialWallet,
  TransferCustodialWalletCelo,
  TransferCustodialWalletBatch,
  TransferCustodialWalletBatchCelo,
  ApproveTransferCustodialWallet,
  ApproveTransferCustodialWalletCelo,
  TransferCustodialWalletKMS,
  GenerateCustodialWalletBatchPayer,
  GenerateCustodialWalletBatch,
  GenerateCustodialWalletBatchKMS,
  GenerateCustodialWalletCelo,
  CallCeloSmartContractMethod,
  TransferCustodialWalletCeloKMS,
  GenerateCustodialWalletBatchCelo,
  GenerateCustodialWalletBatchCeloKMS,
  PendingTransaction,
  ApproveNftSpending,
} from '@tatumio/api-client'
import { Blockchain, blockchainHelper, ChainTransactionKMS } from '@tatumio/shared-core'
import { abstractSdk, WithoutChain } from '@tatumio/shared-abstract-sdk'
import { abstractBlockchainKms } from './services/kms.abstract-blockchain'
import { abstractBlockchainOffchain } from './services/offchain.abstract-blockchain'

export const abstractBlockchainSdk = (args: { apiKey: string; url?: TatumUrl; blockchain: Blockchain }) => {
  return {
    ...abstractSdk(args),
    kms: abstractBlockchainKms(args),
    offchain: abstractBlockchainOffchain(args),
    getExchangeRate(basePair?: Fiat): CancelablePromise<ExchangeRate> {
      return TatumServiceService.getExchangeRate(
        // @ts-ignore @TODO OPENAPI fix
        blockchainHelper.getDefaultCurrencyByBlockchain(blockchain),
        basePair,
      )
    },
  }
}

export interface SdkWithXrpLikeWalletFunction {
  wallet(): CancelablePromise<XrpWallet | XlmWallet>
}

export type FromPrivateKeyOrSignatureId<T extends { fromPrivateKey?: string }> = Omit<T, 'fromPrivateKey'> &
  Partial<SignatureId> &
  Partial<Pick<T, 'fromPrivateKey'>>

export type ChainTransferErc20 = FromPrivateKeyOrSignatureId<Omit<ChainTransferEthErc20, 'chain'>>

export type ChainMintErc20 = FromPrivateKeyOrSignatureId<Omit<ApiChainMintErc20, 'chain'>>

export type ChainBurnErc20 = FromPrivateKeyOrSignatureId<Omit<ApiChainBurnErc20, 'chain'>>

export type ChainDeployErc20 = FromPrivateKeyOrSignatureId<DeployErc20>

export type ChainMintErc721 = MintErc721 & {
  fromPrivateKey?: string
  minter?: string
  chain: 'ETH' | 'MATIC' | 'KCS' | 'ONE' | 'BSC' | 'KLAY'
}

export type ChainMintNft = FromPrivateKeyOrSignatureId<MintNft>

export type ChainMintMultipleNft = FromPrivateKeyOrSignatureId<MintMultipleNft> & {
  erc20?: string
}

export type ChainBurnErc721 = FromPrivateKeyOrSignatureId<BurnNft>

export type ChainTransferErc721 = FromPrivateKeyOrSignatureId<TransferNft>

export type ChainUpdateCashbackErc721 = FromPrivateKeyOrSignatureId<UpdateCashbackValueForAuthorNft>

export type ChainDeployErc721 = FromPrivateKeyOrSignatureId<DeployNft>

export type ChainBurnMultiToken = FromPrivateKeyOrSignatureId<BurnMultiToken>

export type ChainBurnMultiTokenBatch = FromPrivateKeyOrSignatureId<BurnMultiTokenBatch>

export type ChainTransferMultiToken = FromPrivateKeyOrSignatureId<TransferMultiToken>

export type ChainTransferMultiTokenBatch = FromPrivateKeyOrSignatureId<TransferMultiTokenBatch>

export type ChainMintMultiToken = MintMultiToken & { fromPrivateKey?: string }

export type ChainMintMultiTokenBatch = FromPrivateKeyOrSignatureId<MintMultiTokenBatch>

export type ChainDeployMultiToken = FromPrivateKeyOrSignatureId<DeployMultiToken>

export type ChainSmartContractMethodInvocation = FromPrivateKeyOrSignatureId<CallSmartContractMethod> & {
  index?: number
}

export type ChainGenerateCustodialAddress =
  | FromPrivateKeyOrSignatureId<GenerateCustodialWallet>
  | FromPrivateKeyOrSignatureId<GenerateCustodialWalletCelo>

export type ChainTransferNative = FromPrivateKeyOrSignatureId<Omit<TransferPolygonBlockchain, 'currency'>>

export type ChainGenerateMarketplace = FromPrivateKeyOrSignatureId<GenerateMarketplace>

export type ChainUpdateFee = FromPrivateKeyOrSignatureId<UpdateFee>

export type ChainUpdateFeeRecipient = FromPrivateKeyOrSignatureId<UpdateFeeRecipient>

export type ChainBuyAssetOnMarketplace = FromPrivateKeyOrSignatureId<BuyAssetOnMarketplace>

export type ChainSellAssetOnMarketplace = FromPrivateKeyOrSignatureId<SellAssetOnMarketplace>

export type ChainCancelSellAssetOnMarketplace = FromPrivateKeyOrSignatureId<CancelSellAssetOnMarketplace>

export type ChainTransferCustodialWallet =
  | (FromPrivateKeyOrSignatureId<TransferCustodialWallet> & {
      index?: number
    })
  | (FromPrivateKeyOrSignatureId<TransferCustodialWalletCelo> & {
      index?: number
    })

export type ChainBatchTransferCustodialWallet =
  | (FromPrivateKeyOrSignatureId<TransferCustodialWalletBatch> & { index?: number })
  | (FromPrivateKeyOrSignatureId<TransferCustodialWalletBatchCelo> & { index?: number })

export type ChainApproveCustodialTransfer =
  | (FromPrivateKeyOrSignatureId<ApproveTransferCustodialWallet> & { index?: number })
  | (FromPrivateKeyOrSignatureId<ApproveTransferCustodialWalletCelo> & { index?: number })

export type ChainTransferFromCustodialAddress =
  | TransferCustodialWalletKMS
  | TransferCustodialWallet
  | TransferCustodialWalletCelo
  | TransferCustodialWalletCeloKMS

export type ChainGenerateCustodialWalletBatch =
  | GenerateCustodialWalletBatchPayer
  | GenerateCustodialWalletBatch
  | GenerateCustodialWalletBatchKMS
  | GenerateCustodialWalletBatchCelo
  | GenerateCustodialWalletBatchCeloKMS

export type ChainCallSmartContractMethod =
  | (FromPrivateKeyOrSignatureId<CallSmartContractMethod> & {
      index?: number
    })
  | (FromPrivateKeyOrSignatureId<CallCeloSmartContractMethod> & {
      index?: number
      chain: 'CELO'
    })

export type ChainTransferCustodialWalletCelo = FromPrivateKeyOrSignatureId<TransferCustodialWalletCelo> & {
  index?: number
}

export interface SdkWithErc20Functions {
  decimals(contractAddress: string, provider?: string): any

  prepare: {
    deploySignedTransaction(body: ChainDeployErc20, provider?: string): Promise<string>
    transferSignedTransaction(body: ChainTransferErc20, provider?: string): Promise<string>
    mintSignedTransaction(body: ChainMintErc20, provider?: string): Promise<string>
    burnSignedTransaction(body: ChainBurnErc20, provider?: string): Promise<string>
  }
}

export interface SdkWithNativeFunctions {
  prepare: {
    transferSignedTransaction(body: ChainTransferNative, provider?: string): Promise<string>
  }
}

export interface SdkWithErc721Functions {
  prepare: {
    deploySignedTransaction(body: ChainDeployErc721, provider?: string): Promise<string>
    transferSignedTransaction(body: ChainTransferErc721, provider?: string): Promise<string>
    mintSignedTransaction(body: ChainMintErc721, provider?: string): Promise<string>
    burnSignedTransaction(body: ChainBurnErc721, provider?: string): Promise<string>
    mintMultipleSignedTransaction(body: ChainMintMultipleNft, provider?: string): Promise<string>
    mintCashbackSignedTransaction(body: ChainMintNft, provider?: string): Promise<string>
    mintMultipleCashbackSignedTransaction(body: ChainMintMultipleNft, provider?: string): Promise<string>
    updateCashbackForAuthorSignedTransaction(
      body: ChainUpdateCashbackErc721,
      provider?: string,
    ): Promise<string>
    mintProvenanceSignedTransaction(body: ChainMintNft, provider?: string): Promise<string>
    mintMultipleProvenanceSignedTransaction(
      body: ChainMintMultipleNft & { fixedValues: string[][] },
      provider?: string,
    ): Promise<string>
  }
}

export interface SdkWithMultiTokenFunctions {
  prepare: {
    mintMultiTokenTransaction(body: ChainMintMultiToken, provider?: string): Promise<string>
    mintMultiTokenBatchTransaction(body: ChainMintMultiTokenBatch, provider?: string): Promise<string>
    transferMultiTokenTransaction(body: ChainTransferMultiToken, provider?: string): Promise<string>
    transferMultiTokenBatchTransaction(body: ChainTransferMultiTokenBatch, provider?: string): Promise<string>
    deployMultiTokenTransaction(body: ChainDeployMultiToken, provider?: string): Promise<string>
    burnMultiTokenTransaction(body: ChainBurnMultiToken, provider?: string): Promise<string>
    burnMultiTokenBatchTransaction(body: ChainBurnMultiTokenBatch, provider?: string): Promise<string>
  }
}

export interface SdkWithSmartContractFunctions {
  prepare: {
    smartContractWriteMethodInvocationTransaction(
      body: ChainSmartContractMethodInvocation,
      provider?: string,
    ): Promise<string>
  }
  send: {
    smartContractReadMethodInvocationTransaction(
      body: CallReadSmartContractMethod,
      provider?: string,
    ): Promise<{ data: any }>
  }
}

export interface SdkWithCustodialFunctions {
  prepare: {
    transferFromCustodialWallet(
      body: ChainTransferCustodialWallet,
      testnet?: boolean,
      provider?: string,
    ): Promise<string>
    batchTransferFromCustodialWallet: (
      body: ChainBatchTransferCustodialWallet,
      testnet: boolean,
      provider?: string,
    ) => Promise<string>
    approveFromCustodialWallet: (body: ChainApproveCustodialTransfer, provider?: string) => Promise<string>
    custodialWalletBatch: (
      body: ChainGenerateCustodialWalletBatch,
      testnet: boolean,
      provider?: string,
    ) => Promise<string>
  }
}
export interface SdkWithMarketplaceFunctions {
  prepare: {
    approveErc20Spending(body: ApproveErc20, provider?: string): Promise<string>
    approveSpending(
      body: FromPrivateKeyOrSignatureId<WithoutChain<ApproveNftSpending>> & { amount: string },
      provider?: string,
    ): Promise<string>
    generateMarketplace(body: ChainGenerateMarketplace, provider?: string): Promise<string>
    updateFee(body: ChainUpdateFee, provider?: string): Promise<string>
    updateFeeRecipient(body: ChainUpdateFeeRecipient, provider?: string): Promise<string>
    buyMarketplaceListing(body: ChainBuyAssetOnMarketplace, provider?: string): Promise<string>
    sellMarketplaceListing(body: ChainSellAssetOnMarketplace, provider?: string): Promise<string>
    cancelMarketplaceListing(body: ChainCancelSellAssetOnMarketplace, provider?: string): Promise<string>
  }

  getMarketplaceListing: typeof BlockchainMarketplaceService.getMarketplaceListing
  getMarketplaceListings: typeof BlockchainMarketplaceService.getMarketplaceListings
  getMarketplaceFee: typeof BlockchainMarketplaceService.getMarketplaceFee
  getMarketplaceFeeRecipient: typeof BlockchainMarketplaceService.getMarketplaceFeeRecipient
}

export interface SdkWithKmsFunctions {
  sign(tx: ChainTransactionKMS, fromPrivateKey: string, provider?: string): Promise<string>
  getAllPending(signatures?: string): CancelablePromise<PendingTransaction[]>
  get(id: string): CancelablePromise<PendingTransaction>
}

export type BroadcastFunction = (requestBody: BroadcastKMS) => CancelablePromise<TransactionHashKMS>
