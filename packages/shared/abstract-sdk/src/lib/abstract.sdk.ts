import {
  ExchangeRateService,
  IpfsService,
  MaliciousAddressService,
  NotificationSubscriptionsService,
  ServiceUtilsService,
  TatumApi,
  TatumUrlArg,
} from '@tatumio/api-client'
import { abstractSdkKms } from './services/kms.abstract'
import { abstractSdkNftService } from './services/nft.abstract'
import { abstractSdkLedgerService } from './services/ledger.abstract'
import { logger, SdkLoggerConfig } from './logger'

export interface SDKArguments {
  apiKey: string
  url?: TatumUrlArg
  provider?: string
  logger?: SdkLoggerConfig
}

export const abstractSdk = (args: SDKArguments) => {
  TatumApi(args.apiKey, args.url)

  logger.useLogger(args?.logger)

  return {
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
    kms: abstractSdkKms(),
    ledger: abstractSdkLedgerService(),
  }
}

export const abstractSdkNft = () => {
  return {
    nft: abstractSdkNftService(),
    storage: {
      upload: IpfsService.storeIpfs,
      get: IpfsService.getIpfsData,
    },
  }
}
