import { ApiServices } from '@tatumio/api-client'

export type XlmApiCallsType = {
  getAccountInfo: typeof ApiServices.blockchain.xlm.xlmGetAccountInfo
}

export * from './lib/xlm.sdk'
