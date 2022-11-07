import { OpenAPI, TATUM_API_CONSTANTS } from '@tatumio/api-client'
import _ from 'lodash'
import { FlowSdkError } from '../flow.sdk.errors'
import { SdkErrorCode } from '@tatumio/shared-abstract-sdk'

export interface FlowProvider {
  getProvider(): string
  isTestnet(): boolean
}

export const flowProvider = (args: { provider?: string; testnet: boolean }) => {
  if (_.isNil(args) || _.isNil(args.testnet))
    throw new FlowSdkError({ code: SdkErrorCode.FLOW_MISSING_NETWORK })

  return {
    getProvider(): string {
      return args.provider || `${OpenAPI.BASE}/v3/blockchain/node/FLOW/${TATUM_API_CONSTANTS.API_KEY}`
    },
    isTestnet(): boolean {
      return args.testnet
    },
  }
}
