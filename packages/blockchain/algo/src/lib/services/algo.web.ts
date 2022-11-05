import * as algosdk from 'algosdk'
import Url from 'url-parse'
import { Currency, TATUM_API_CONSTANTS } from '@tatumio/api-client'
import { SDKArguments } from '@tatumio/shared-abstract-sdk'
import AlgodClient from 'algosdk/dist/types/src/client/v2/algod/algod'
import IndexerClient from 'algosdk/dist/types/src/client/v2/indexer/indexer'

export enum AlgoNodeType {
  ALGOD = 'ALGOD',
  INDEXER = 'INDEXER',
}

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
    getClient: (testnet: boolean, provider?: string): AlgodClient => {
      if (provider) {
        return new algosdk.Algodv2('', provider, Url(provider).port)
      } else {
        const endpoint = `${args.url || TATUM_API_CONSTANTS.URL}/${
          TATUM_API_CONSTANTS.API_VERSION
        }/blockchain/node/${Currency.ALGO}/${args.apiKey}`
        return new algosdk.Algodv2(
          {
            nodeType: AlgoNodeType.ALGOD,
            [TATUM_API_CONSTANTS.HEADER_API_KEY]: args.apiKey,
          },
          endpoint,
          '',
        )
      }
    },
    getIndexerClient: (testnet: boolean, provider?: string): IndexerClient => {
      if (provider) {
        return new algosdk.Indexer('', provider, Url(provider).port)
      } else {
        const endpoint = `${args.url || TATUM_API_CONSTANTS.URL}/${
          TATUM_API_CONSTANTS.API_VERSION
        }/blockchain/node/${Currency.ALGO}/${args.apiKey}`
        return new algosdk.Indexer(
          {
            nodeType: AlgoNodeType.INDEXER,
            [TATUM_API_CONSTANTS.HEADER_API_KEY]: args.apiKey,
          },
          endpoint,
          '',
        )
      }
    },
  }
}
