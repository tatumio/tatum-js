import Web3 from 'web3'
import { OpenAPI, TATUM_API_CONSTANTS } from '@tatumio/api-client'
import { EvmBasedBlockchain, httpHelper } from '@tatumio/shared-core'

export interface EvmBasedWeb3 {
  getClient(provider?: string, fromPrivateKey?: string): Web3

  getGasPriceInWei(provider?: string): Promise<string>
}

export const evmBasedWeb3 = (args: { blockchain: EvmBasedBlockchain }) => {
  return {
    getClient(provider?: string, fromPrivateKey?: string): Web3 {
      const endpoint = httpHelper.web3Endpoint(args.blockchain, OpenAPI.BASE, TATUM_API_CONSTANTS.API_KEY)

      const web3 = new Web3(provider || endpoint)
      if (fromPrivateKey) {
        web3.eth.accounts.wallet.add(fromPrivateKey)
        web3.eth.defaultAccount = web3.eth.accounts.wallet[0].address
      }
      return web3
    },
  }
}
