import {
  BroadcastKMS,
  BurnMultiToken,
  BurnMultiTokenBatch,
  BurnNft,
  CancelablePromise,
  ChainBurnErc20 as ApiChainBurnErc20,
  ChainMintErc20 as ApiChainMintErc20,
  ChainTransferEthErc20,
  DeployErc20,
  DeployMultiToken,
  DeployNft,
  ExchangeRate,
  MintErc721,
  MintMultipleNft,
  MintMultiToken,
  MintMultiTokenBatch,
  MintNft,
  SignatureId,
  TatumServiceService,
  TatumUrl,
  TransactionHashKMS,
  TransferMultiToken,
  TransferMultiTokenBatch,
  TransferNft,
  TronWallet,
  UpdateCashbackValueForAuthorNft,
  XlmWallet,
  XrpWallet,
} from '@tatumio/api-client'
import { Blockchain, blockchainHelper, Fiat } from '@tatumio/shared-core'
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
  chain: 'ETH' | 'MATIC' | 'KCS' | 'ONE' | 'BSC'
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

export interface SdkWithErc20Functions {
  decimals(contractAddress: string, provider?: string): any
  prepare: {
    deploySignedTransaction(body: ChainDeployErc20, provider?: string): Promise<string>
    transferSignedTransaction(body: ChainTransferErc20, provider?: string): Promise<string>
    mintSignedTransaction(body: ChainMintErc20, provider?: string): Promise<string>
    burnSignedTransaction(body: ChainBurnErc20, provider?: string): Promise<string>
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
