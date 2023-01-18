import { XrpAccount, XrpFee } from '@tatumio/api-client'

export type XrpApiCallsType = {
  getAccountDetail: (account: string) => Promise<XrpAccount>
  getFee: () => Promise<XrpFee>
}

export * from './lib/xrp.sdk'
export * from './lib/services/xrp.sdk.wallet'
