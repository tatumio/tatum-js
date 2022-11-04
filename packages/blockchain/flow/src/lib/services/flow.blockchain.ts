import { httpHelper } from '@tatumio/shared-core'
import { TATUM_API_CONSTANTS } from '@tatumio/api-client'
import { SDKArguments } from '@tatumio/shared-abstract-sdk'

const baseUrl = () => process.env['TATUM_API_URL'] || TATUM_API_CONSTANTS.URL

const headers = (xApiKey: string) => ({
  headers: {
    'x-api-key': xApiKey || process.env['TATUM_API_KEY'] || TATUM_API_CONSTANTS.API_KEY,
    'x-testnet-type': process.env['TESTNET_TYPE'] || 'ethereum-ropsten',
  },
})

const post = async <T extends object, U, V>(
  xApiKey: string,
  url: string,
  targetUrl?: string,
  body?: U,
): Promise<V> => {
  const { data } = await httpHelper.post(`${targetUrl ?? baseUrl()}${url}`, body, headers(xApiKey))
  return data
}

const get = async <T>(xApiKey: string, url: string, targetUrl?: string): Promise<T> => {
  const { data } = await httpHelper.get(`${targetUrl ?? baseUrl()}${url}`, headers(xApiKey))
  return data
}

// Flow specific methods performing internal tasks on the API
export const flowBlockchain = (args: SDKArguments) => {
  return {
    getSignKey: async (isPayer: boolean): Promise<{ keyId: number; address: string }> =>
      get(args.apiKey, `/v3/flow/proposal/${isPayer}`, args.url),
    signWithKey: async (data: string, isPayer: boolean): Promise<{ signature: string }> =>
      post(args.apiKey, '/v3/flow/sign', args.url, { data, isPayer }),
    broadcast: async (
      txData: string,
      signatureId?: string,
      proposalKey?: number,
    ): Promise<{ txId: string; failed?: boolean }> =>
      post(args.apiKey, '/v3/flow/broadcast', args.url, { txData, signatureId, proposalKey }),
  }
}
