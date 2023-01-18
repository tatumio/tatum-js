import { BnbAccount } from '@tatumio/api-client'

export type BnbApiCallsType = {
  getAccountInfo: (account: string) => Promise<BnbAccount>
}

export * from './lib/bnb.sdk'
export * from './lib/services/bnb.wallet'
