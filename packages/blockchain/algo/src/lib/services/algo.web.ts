import * as algosdk from 'algosdk'
import Url from 'url-parse'

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

export const algoWeb = (): AlgoWeb => {
  return {
    getClient: (testnet, provider?: string) => {
      const tokenValue = testnet
        ? process.env.TATUM_ALGORAND_TESTNET_TOKEN
        : process.env.TATUM_ALGORAND_MAINNET_TOKEN

      if (provider) {
        return new algosdk.Algodv2(tokenValue ?? 'DUMMYTOKEN', provider, Url(provider).port)
      } else {
        const server = testnet
          ? process.env.TATUM_ALGORAND_TESTNET_THIRD_API_ALGOD_URL
          : process.env.TATUM_ALGORAND_MAINNET_THIRD_API_ALGOD_URL

        return new algosdk.Algodv2(
          {
            'X-API-Key': tokenValue,
          },
          server,
        )
      }
    },
    getIndexerClient: (testnet: boolean, provider?: string) => {
      const tokenValue = testnet
        ? process.env.TATUM_ALGORAND_TESTNET_TOKEN
        : process.env.TATUM_ALGORAND_MAINNET_TOKEN

      if (provider) {
        return new algosdk.Indexer(tokenValue ?? 'DUMMYTOKEN', provider, Url(provider).port)
      } else {
        const server = testnet
          ? process.env.TATUM_ALGORAND_TESTNET_THIRD_API_ALGOD_URL
          : process.env.TATUM_ALGORAND_MAINNET_THIRD_API_ALGOD_URL

        return new algosdk.Indexer(
          {
            'X-API-Key': tokenValue,
          },
          server,
        )
      }
    },
  }
}
