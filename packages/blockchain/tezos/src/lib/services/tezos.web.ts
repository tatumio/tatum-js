import { OpenAPI, TATUM_API_CONSTANTS } from '@tatumio/api-client'
import { TezosToolkit } from '@taquito/taquito'

export interface ITezosWeb {
  getClient(provider?: string): TezosToolkit
}
export const tezosWeb = (): ITezosWeb => ({
  getClient: (provider?: string): TezosToolkit => {
    const endpoint = provider || `${OpenAPI.BASE}/v3/tezos/node/${TATUM_API_CONSTANTS.API_KEY}`
    return new TezosToolkit(endpoint)
  },
})
