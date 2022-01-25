import {
  LedgerSubscriptionService,
  SecurityAddressService,
  StorageIpfsService,
  TatumApi,
  TatumServiceService,
  TatumUrl,
} from '@tatumio/api-client'
import { abstractSdkOffChain } from './services/offchain.abstract'
import { abstractSdkKms } from './services/kms.abstract'
import { abstractSdkLedgerService } from './services/ledger.abstract'
import { abstractSdkNftService } from './services/nft.abstract'

export interface SDKArguments {
  apiKey: string
  url?: TatumUrl
}

export const abstractSdk = (args: SDKArguments) => {
  TatumApi(args.apiKey, args.url)

  return {
    storage: {
      upload: StorageIpfsService.storeIpfs,
      get: StorageIpfsService.getIpfsData,
    },
    subscriptions: LedgerSubscriptionService,
    ledger: abstractSdkLedgerService(),
    security: {
      checkMaliciousAddress: SecurityAddressService.checkMalicousAddress,
    },
    tatum: {
      getCredits: TatumServiceService.getCredits,
      getVersion: TatumServiceService.getVersion,
      freezeApiKey: TatumServiceService.freezeApiKey,
      unfreezeApiKey: TatumServiceService.unfreezeApiKey,
    },
    offchain: abstractSdkOffChain(),
    nft: abstractSdkNftService(),
    kms: abstractSdkKms(),
    getExchangeRate: TatumServiceService.getExchangeRate,
  }
}
