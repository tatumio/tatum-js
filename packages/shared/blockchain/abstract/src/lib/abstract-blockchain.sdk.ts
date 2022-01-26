import {
  CancelablePromise,
  ChainBurnErc20,
  ChainMintErc20,
  ChainTransferEthErc20,
  DeployErc20,
  ExchangeRate,
  TatumServiceService,
  TatumUrl,
  TronWallet,
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

export interface ISignature {
  signatureId: string
}

export type ChainTransferErc20 = Omit<ChainTransferEthErc20, 'chain'>

export interface SdkWithErc20Functions {
  decimals(contractAddress: string, provider?: string): any
  prepare: {
    deploySignedTransaction(body: DeployErc20 & ISignature, provider?: string): Promise<string>
    transferSignedTransaction(body: ChainTransferErc20 & ISignature, provider?: string): Promise<string>
    mintSignedTransaction(body: ChainMintErc20 & ISignature, provider?: string): Promise<string>
    burnSignedTransaction(body: ChainBurnErc20 & ISignature, provider?: string): Promise<string>
  }
}
