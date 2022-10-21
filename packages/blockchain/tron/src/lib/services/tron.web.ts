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
      const endpoint = provider || `${process.env['TATUM_API_URL'] || TATUM_API_CONSTANTS.URL}/v3/tron/node/${TATUM_API_CONSTANTS.API_KEY}`

      const HttpProvider = TronWeb.providers.HttpProvider

      const fullNode = new HttpProvider(endpoint)
      const solidityNode = new HttpProvider(endpoint)
      const eventServer = new HttpProvider(endpoint)

      const tronWebInstace = new TronWeb(fullNode, solidityNode, eventServer)

      tronWebInstace.setHeader({
        'TRON-PRO-API-KEY': process.env['TRON_PRO_API_KEY'] ?? TATUM_API_CONSTANTS.TRON_PRO_API_KEY,
      })

      return tronWebInstace
    },
  }
}
