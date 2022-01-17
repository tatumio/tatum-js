import {
  CancelablePromise,
  ExchangeRate,
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
import { Fiat } from '@tatumio/shared-core'

export const abstractSdk = (args: { apiKey: string; url?: TatumUrl }) => {
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
