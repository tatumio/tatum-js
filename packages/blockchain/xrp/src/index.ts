import { ApiServices } from '@tatumio/api-client'

export type XrpApiCallsType = {
  getAccountDetail: typeof ApiServices.blockchain.xrp.xrpGetAccountInfo
  getFee: typeof ApiServices.blockchain.xrp.xrpGetFee
}

export * from './lib/xrp.sdk'
