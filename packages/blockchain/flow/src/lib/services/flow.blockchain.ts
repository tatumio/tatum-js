import { httpHelper } from '@tatumio/shared-core'
import { TATUM_API_CONSTANTS } from '@tatumio/api-client'

const baseUrl = () => process.env['TATUM_API_URL'] || TATUM_API_CONSTANTS.URL

const headers = () => ({
  headers: {
    'x-api-key': process.env['TATUM_API_KEY'] || TATUM_API_CONSTANTS.API_KEY,
    'x-testnet-type': process.env['TESTNET_TYPE'] || 'ethereum-ropsten',
  },
})

const post = async <T extends object, U, V>(url: string, body?: U): Promise<V> => {
  const { data } = await httpHelper.post(`${baseUrl()}${url}`, body, headers())
  return data
}

const get = async <T>(url: string): Promise<T> => {
  const { data } = await httpHelper.get(`${baseUrl()}${url}`, headers())
  return data
}

// Flow specific methods performing internal tasks on the API
export const flowBlockchain = () => {
  return {
    getSignKey: async (isPayer: boolean): Promise<{ keyId: number; address: string }> =>
      get(`/v3/flow/proposal/${isPayer}`),
    signWithKey: async (data: string, isPayer: boolean): Promise<{ signature: string }> =>
      post('/v3/flow/sign', { data, isPayer }),
    broadcast: async (
      txData: string,
      signatureId?: string,
      proposalKey?: number,
    ): Promise<{ txId: string; failed?: boolean }> =>
      post('/v3/flow/broadcast', { txData, signatureId, proposalKey }),
  }
}
