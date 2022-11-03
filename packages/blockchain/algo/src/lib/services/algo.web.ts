import * as algosdk from 'algosdk'
import Url from 'url-parse'
import { Currency, TATUM_API_CONSTANTS } from "@tatumio/api-client";
import { SDKArguments } from '@tatumio/shared-abstract-sdk'

export interface AlgoWeb {
  /**
   * Algod V2 Client
   * @param testnet if the algorand node is testnet or not
   * @param provider url of the algorand server endpoint
   * @returns algorand Client
   */
  getClient(testnet: boolean, provider?: string): algosdk.Algodv2
  /**
   * Algo Indexer Client
   * @param testnet if the algorand node is testnet or not
   * @param provider url of the algorand server endpoint
   * @returns algorand Indexer Client
   */
  getIndexerClient(testnet: boolean, provider?: string): algosdk.Indexer
}

export const algoWeb = (args: SDKArguments): AlgoWeb => {
  return {
    getClient: (testnet: boolean, provider?: string) => {
      if (provider) {
        return new algosdk.Algodv2('', provider, Url(provider).port)
      } else {
        const endpoint = `${args.url || TATUM_API_CONSTANTS.URL}/${
          TATUM_API_CONSTANTS.API_VERSION
        }/blockchain/node/${Currency.ALGO}/`
        return new algosdk.Algodv2({ nodeType: 'ALGOD' }, endpoint)
      }
    },
    getIndexerClient: (testnet: boolean, provider?: string) => {
      if (provider) {
        return new algosdk.Indexer('', provider, Url(provider).port)
      } else {
        const endpoint = `${args.url || TATUM_API_CONSTANTS.URL}/${
          TATUM_API_CONSTANTS.API_VERSION
        }/blockchain/node/${Currency.ALGO}/`
        return new algosdk.Indexer({ nodeType: 'INDEXER' }, endpoint)
      }
    },
  }
}
