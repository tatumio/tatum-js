import { TATUM_API_CONSTANTS } from '@tatumio/api-client'
// tronweb lib dont have any typings (not even in @types)
// @ts-ignore
import TronWeb from 'tronweb'

export type TronWebClient = any

// TODO: name conflict with lib export TronWeb
export interface ITronWeb {
  getClient(provider?: string): TronWebClient
}

export const tronWeb = (): ITronWeb => {
  return {
    getClient: (provider?: string): TronWebClient => {
      const endpoint = provider ?? process.env['TATUM_API_URL'] ?? TATUM_API_CONSTANTS.URL

      const HttpProvider = TronWeb.providers.HttpProvider

      const fullNode = new HttpProvider(endpoint)
      const solidityNode = new HttpProvider(endpoint)
      const eventServer = new HttpProvider(endpoint)

      const tronWeb = new TronWeb(fullNode, solidityNode, eventServer)

      tronWeb.setHeader({ 'TRON-PRO-API-KEY': process.env['TRON_PRO_API_KEY'] })

      return tronWeb
    },
  }
}
