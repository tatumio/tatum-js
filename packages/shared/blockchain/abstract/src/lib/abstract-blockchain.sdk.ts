import {
  ApproveErc20,
  BlockchainMarketplaceService,
  BroadcastKMS,
  BurnMultiToken,
  BurnMultiTokenBatch,
  BurnNft,
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
} from '@tatumio/api-client'
import { Blockchain, blockchainHelper } from '@tatumio/shared-core'
import { abstractSdk } from '@tatumio/shared-abstract-sdk'
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

export interface SdkWithWalletFunctions {
  generateAddressFromXPub(xpub: string, i: number, options?: { testnet: boolean }): string

  generatePrivateKeyFromMnemonic(mnemonic: string, i: number, options?: { testnet: boolean }): Promise<string>

  generateAddressFromPrivateKey(privateKey: string, options?: { testnet: boolean }): string

  generateWallet(mnemonic?: string, options?: { testnet: boolean }): Promise<TronWallet>
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

export type ChainTransferNative = FromPrivateKeyOrSignatureId<Omit<TransferPolygonBlockchain, 'currency'>>

export type ChainGenerateMarketplace = FromPrivateKeyOrSignatureId<GenerateMarketplace>

export type ChainUpdateFee = FromPrivateKeyOrSignatureId<UpdateFee>

export type ChainUpdateFeeRecipient = FromPrivateKeyOrSignatureId<UpdateFeeRecipient>

export type ChainBuyAssetOnMarketplace = FromPrivateKeyOrSignatureId<BuyAssetOnMarketplace>

export type ChainSellAssetOnMarketplace = FromPrivateKeyOrSignatureId<SellAssetOnMarketplace>

export type ChainCancelSellAssetOnMarketplace = FromPrivateKeyOrSignatureId<CancelSellAssetOnMarketplace>

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

export interface SdkWithMarketplaceFunctions {
  prepare: {
    approveErc20Spending(body: ApproveErc20, provider?: string): Promise<string>
    generateMarketplace(body: ChainGenerateMarketplace, provider?: string): Promise<string>
    updateFee(body: ChainUpdateFee, provider?: string): Promise<string>
    updateFeeRecipient(body: ChainUpdateFeeRecipient, provider?: string): Promise<string>
    buyMarketplaceListing(body: ChainBuyAssetOnMarketplace, provider?: string): Promise<string>
    createMarketplaceListing(body: ChainSellAssetOnMarketplace, provider?: string): Promise<string>
    cancelMarketplaceListing(body: ChainCancelSellAssetOnMarketplace, provider?: string): Promise<string>
  }

  getMarketplaceListing: typeof BlockchainMarketplaceService.getMarketplaceListing
  getMarketplaceListings: typeof BlockchainMarketplaceService.getMarketplaceListings
  getMarketplaceFee: typeof BlockchainMarketplaceService.getMarketplaceFee
  getMarketplaceFeeRecipient: typeof BlockchainMarketplaceService.getMarketplaceFeeRecipient
}

export type BroadcastFunction = (requestBody: BroadcastKMS) => CancelablePromise<TransactionHashKMS>

export interface SdkWithErc20Functions {
  decimals(contractAddress: string, provider?: string): any
  prepare: {
    deploySignedTransaction(body: ChainDeployErc20, provider?: string): Promise<string>
    transferSignedTransaction(body: ChainTransferErc20, provider?: string): Promise<string>
    mintSignedTransaction(body: ChainMintErc20, provider?: string): Promise<string>
    burnSignedTransaction(body: ChainBurnErc20, provider?: string): Promise<string>
  }
}
