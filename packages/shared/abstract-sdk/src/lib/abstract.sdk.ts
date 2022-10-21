import {
  ExchangeRateService,
  IpfsService,
  MaliciousAddressService,
  NotificationSubscriptionsService,
  ServiceUtilsService,
  TatumApi,
  TatumUrl,
} from '@tatumio/api-client'
import { abstractSdkOffChain } from './services/offchain.abstract'
import { abstractSdkKms } from './services/kms.abstract'
import { abstractSdkNftService } from './services/nft.abstract'
import { abstractSdkLedgerService } from './services/ledger.abstract'
import { abstractSdkCustodialManagedWallets } from './services/custodial.abstract'

export interface SDKArguments {
  apiKey: string
  url?: TatumUrl
  provider?: string
}

export const abstractSdk = (args: SDKArguments) => {
  TatumApi(args.apiKey, args.url)

  return {
    storage: {
      upload: IpfsService.storeIpfs,
      get: IpfsService.getIpfsData,
    },
    subscriptions: NotificationSubscriptionsService,
    security: {
      checkMaliciousAddress: MaliciousAddressService.checkMalicousAddress,
    },
    tatum: {
      getCredits: ServiceUtilsService.getCredits,
      getVersion: ServiceUtilsService.getVersion,
      freezeApiKey: ServiceUtilsService.freezeApiKey,
      unfreezeApiKey: ServiceUtilsService.unfreezeApiKey,
    },
    custodialManagedWallet: abstractSdkCustodialManagedWallets(),
    offchain: abstractSdkOffChain(),
    nft: abstractSdkNftService(),
    kms: abstractSdkKms(),
    getExchangeRate: ExchangeRateService.getExchangeRate,
    ledger: abstractSdkLedgerService(),
  }
}
