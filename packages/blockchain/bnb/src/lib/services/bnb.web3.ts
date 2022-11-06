import { OpenAPI, TATUM_API_CONSTANTS } from '@tatumio/api-client'
import { BncClient } from '@binance-chain/javascript-sdk'
import { Blockchain, httpHelper } from '@tatumio/shared-core'

export interface BnbWeb3 {
  getClient(testnet: boolean, privateKey: string, provider?: string): Promise<BncClient>
}

export const bnbWeb3 = (clientProvider?: string): BnbWeb3 => {
  return {
    async getClient(testnet: boolean, privateKey: string, provider?: string): Promise<BncClient> {
      const bnbClient = new BncClient(
        provider ??
          clientProvider ??
          httpHelper.rpcEndpoint(Blockchain.BNB, OpenAPI.BASE, TATUM_API_CONSTANTS.API_KEY),
      )
      bnbClient.chooseNetwork(testnet ? 'testnet' : 'mainnet')
      await bnbClient.setPrivateKey(privateKey, true)
      await bnbClient.initChain()

      return bnbClient
    },
  }
}
