import {
  AddNftMinter,
  ApproveErc20,
  ApproveNftSpending,
  ApproveTransferCustodialWallet,
  ApproveTransferCustodialWalletCelo,
  BroadcastKMS,
  BurnMultiToken,
  BurnMultiTokenBatch,
  BurnNft,
  BuyAssetOnMarketplace,
  CallCeloSmartContractMethod,
  CallReadSmartContractMethod,
  CallSmartContractMethod,
  CancelablePromise,
  CancelSellAssetOnMarketplace,
  ChainBurnErc20 as ApiChainBurnErc20,
  ChainDeployErc20,
  ChainMintErc20 as ApiChainMintErc20,
  ChainTransferEthErc20,
  Currency,
  DeployMultiToken,
  DeployNft,
  ExchangeRate,
  ExchangeRateService,
  Fiat,
  GenerateCustodialWallet,
  GenerateCustodialWalletBatch,
  GenerateCustodialWalletBatchCelo,
  GenerateCustodialWalletBatchCeloKMS,
  GenerateCustodialWalletBatchKMS,
  GenerateCustodialWalletBatchPayer,
  GenerateCustodialWalletCelo,
  GenerateMarketplace,
  MarketplaceService,
  MintMultipleNft,
  MintMultiToken,
  MintMultiTokenBatch,
  MintNft,
  PendingTransaction,
  SellAssetOnMarketplace,
  SignatureId,
  TatumUrlArg,
  TransactionHash,
  TransferCustodialWallet,
  TransferCustodialWalletBatch,
  TransferCustodialWalletBatchCelo,
  TransferCustodialWalletCelo,
  TransferCustodialWalletCeloKMS,
  TransferCustodialWalletKMS,
  TransferMultiToken,
  TransferMultiTokenBatch,
  TransferNft,
  TransferPolygonBlockchain,
  UpdateFee,
  UpdateFeeRecipient,
  XlmWallet,
  XrpWallet,
} from '@tatumio/api-client'
import { Blockchain, blockchainHelper } from '@tatumio/shared-core'
import { abstractSdk, WithoutChain } from '@tatumio/shared-abstract-sdk'
import { abstractBlockchainKms } from './services/kms.abstract-blockchain'
import { abstractBlockchainVirtualAccount } from './services/virtualAccount.abstract-blockchain'

export const abstractBlockchainSdk = (args: {
  apiKey: string
  url?: TatumUrlArg
  blockchain: Blockchain
}) => {
  return {
    ...abstractSdk(args),
    kms: abstractBlockchainKms(args),
    virtualAccount: abstractBlockchainVirtualAccount(args),
    getExchangeRate(basePair?: Fiat): CancelablePromise<ExchangeRate> {
      return ExchangeRateService.getExchangeRate(
        // @ts-ignore @TODO OPENAPI fix
        blockchainHelper.getDefaultCurrencyByBlockchain(args.blockchain),
        basePair,
      )
    },
  }
}

export interface SdkWithXrpLikeWalletFunction {
  wallet(): XrpWallet | XlmWallet
  isValidAddress(address: string): boolean
  isValidSecret(secret: string): boolean
}

export type FromSecretOrSignatureId<T extends { fromSecret?: string }> = Omit<T, 'fromSecret'> &
  Partial<SignatureId> &
  Partial<Pick<T, 'fromSecret'>>

export type SecretOrSignatureId<T extends { secret?: string }> = Omit<T, 'secret'> &
  Partial<SignatureId> &
  Partial<Pick<T, 'secret'>>

export type FromPrivateKeyOrSignatureId<T extends { fromPrivateKey?: string }> = Omit<T, 'fromPrivateKey'> &
  Partial<SignatureId & { index: number }> &
  Partial<Pick<T, 'fromPrivateKey'>> &
  Partial<{ mnemonic: string }>

export type PrivateKeyOrSignatureId<T extends { privateKey?: string }> = Omit<T, 'privateKey'> &
  Partial<SignatureId & { index: number }> &
  Partial<Pick<T, 'privateKey'>> &
  Partial<{ mnemonic: string }>

export type FromPrivateKeyOrSignatureIdTron<T extends { fromPrivateKey?: string }> = Omit<
  T,
  'fromPrivateKey'
> &
  Partial<SignatureId & { index: number; account: string; from: string }> &
  Partial<Pick<T, 'fromPrivateKey'>>

export type ChainTransferErc20 = FromPrivateKeyOrSignatureId<WithoutChain<ChainTransferEthErc20>>

export type ChainMintErc20 = FromPrivateKeyOrSignatureId<WithoutChain<ApiChainMintErc20>>

export type ChainBurnErc20 = FromPrivateKeyOrSignatureId<WithoutChain<ApiChainBurnErc20>>

export type ChainApproveErc20 = FromPrivateKeyOrSignatureId<WithoutChain<ApproveErc20>>

export type ChainSdkDeployErc20 = FromPrivateKeyOrSignatureId<WithoutChain<ChainDeployErc20>>

export type ChainMintErc721 = FromPrivateKeyOrSignatureId<WithoutChain<MintNft>>

export type ChainMintMultipleNft = FromPrivateKeyOrSignatureId<WithoutChain<MintMultipleNft>>

export type ChainBurnErc721 = FromPrivateKeyOrSignatureId<WithoutChain<BurnNft>>

export type ChainAddMinterErc721 = FromPrivateKeyOrSignatureId<WithoutChain<AddNftMinter>>

export type ChainTransferErc721 = FromPrivateKeyOrSignatureId<WithoutChain<TransferNft>>

export type ChainDeployErc721 = FromPrivateKeyOrSignatureId<WithoutChain<DeployNft>>

export type ChainBurnMultiToken = FromPrivateKeyOrSignatureId<WithoutChain<BurnMultiToken>>

export type ChainBurnMultiTokenBatch = FromPrivateKeyOrSignatureId<WithoutChain<BurnMultiTokenBatch>>

export type ChainTransferMultiToken = FromPrivateKeyOrSignatureId<WithoutChain<TransferMultiToken>>

export type ChainTransferMultiTokenBatch = FromPrivateKeyOrSignatureId<WithoutChain<TransferMultiTokenBatch>>

export type ChainMintMultiToken = FromPrivateKeyOrSignatureId<WithoutChain<MintMultiToken>>

export type ChainMintMultiTokenBatch = FromPrivateKeyOrSignatureId<WithoutChain<MintMultiTokenBatch>>

export type ChainDeployMultiToken = FromPrivateKeyOrSignatureId<WithoutChain<DeployMultiToken>>

export type ChainSmartContractMethodInvocation = FromPrivateKeyOrSignatureId<CallSmartContractMethod> & {
  index?: number
}

export type ChainGenerateCustodialAddress =
  | FromPrivateKeyOrSignatureId<GenerateCustodialWallet>
  | FromPrivateKeyOrSignatureId<GenerateCustodialWalletCelo>

export type ChainTransferNative = FromPrivateKeyOrSignatureId<Omit<TransferPolygonBlockchain, 'currency'>> & {
  gas?: string
  currency?: Currency
}

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
    deploySignedTransaction(body: ChainSdkDeployErc20, provider?: string): Promise<string>
    transferSignedTransaction(body: ChainTransferErc20, provider?: string): Promise<string>
    mintSignedTransaction(body: ChainMintErc20, provider?: string): Promise<string>
    approveSignedTransaction(body: ChainApproveErc20, provider?: string): Promise<string>
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
      provider?: string,
      testnet?: boolean,
    ): Promise<string>
    batchTransferFromCustodialWallet: (
      body: ChainBatchTransferCustodialWallet,
      provider?: string,
      testnet?: boolean,
    ) => Promise<string>
    approveFromCustodialWallet: (body: ChainApproveCustodialTransfer, provider?: string) => Promise<string>
    custodialWalletBatch: (
      body: ChainGenerateCustodialWalletBatch,
      provider?: string,
      testnet?: boolean,
    ) => Promise<string>
  }
}

export interface SdkWithMarketplaceFunctions {
  prepare: {
    approveErc20Spending(body: FromPrivateKeyOrSignatureId<ApproveErc20>, provider?: string): Promise<string>
    approveSpending(body: FromPrivateKeyOrSignatureId<ApproveNftSpending>, provider?: string): Promise<string>
    generateMarketplace(body: ChainGenerateMarketplace, provider?: string): Promise<string>
    updateFee(body: ChainUpdateFee, provider?: string): Promise<string>
    updateFeeRecipient(body: ChainUpdateFeeRecipient, provider?: string): Promise<string>
    buyMarketplaceListing(body: ChainBuyAssetOnMarketplace, provider?: string): Promise<string>
    sellMarketplaceListing(body: ChainSellAssetOnMarketplace, provider?: string): Promise<string>
    cancelMarketplaceListing(body: ChainCancelSellAssetOnMarketplace, provider?: string): Promise<string>
  }

  getMarketplaceListing: typeof MarketplaceService.getMarketplaceListing
  getMarketplaceListings: typeof MarketplaceService.getMarketplaceListings
  getMarketplaceFee: typeof MarketplaceService.getMarketplaceFee
  getMarketplaceFeeRecipient: typeof MarketplaceService.getMarketplaceFeeRecipient
}

export interface SdkWithKmsFunctions {
  sign(tx: PendingTransaction, fromPrivateKey: string, provider?: string): Promise<string>

  getAllPending(signatures?: string): CancelablePromise<PendingTransaction[]>

  get(id: string): CancelablePromise<PendingTransaction>
}

export type BroadcastFunction = (requestBody: BroadcastKMS) => CancelablePromise<TransactionHash>
