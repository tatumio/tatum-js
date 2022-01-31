import {
  BroadcastKMS,
  BurnNft,
  CancelablePromise,
  ChainBurnErc20 as ApiChainBurnErc20,
  ChainMintErc20 as ApiChainMintErc20,
  ChainTransferEthErc20,
  DeployErc20,
  DeployNft,
  ExchangeRate,
  MintErc721,
  MintMultipleNft,
  MintNft,
  SignatureId,
  TatumServiceService,
  TatumUrl,
  TransactionHashKMS,
  TransferNft,
  TronWallet,
  UpdateCashbackValueForAuthorNft,
  XlmWallet,
  XrpWallet,
} from '@tatumio/api-client'
import { Blockchain, blockchainHelper, Fiat } from '@tatumio/shared-core'
import { abstractSdk } from '@tatumio/abstract-sdk'
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

type FromPrivateKeyOrSignatureId<T extends { fromPrivateKey: string }> = Omit<T, 'fromPrivateKey'> &
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
  }
}

export type BroadcastFunction = (requestBody: BroadcastKMS) => CancelablePromise<TransactionHashKMS>
