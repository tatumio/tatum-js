import { XlmAccount } from '@tatumio/api-client'

export type XlmApiCallsType = {
  getAccountInfo: (account: string) => Promise<XlmAccount>
}

export * from './lib/xlm.sdk'
export * from './lib/services/xlm.sdk.wallet'
