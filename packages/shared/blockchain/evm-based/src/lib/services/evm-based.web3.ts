import Web3 from 'web3'
import { OpenAPI, TATUM_API_CONSTANTS } from '@tatumio/api-client'
import { EvmBasedBlockchain, httpHelper } from '@tatumio/shared-core'
import BigNumber from 'bignumber.js'

export interface EvmBasedWeb3 {
  getClient(provider?: string, fromPrivateKey?: string): Web3

  getGasPriceInWei(provider?: string): Promise<string>
}

export const evmBasedWeb3 = (args: { blockchain: EvmBasedBlockchain; client?: Web3 }) => {
  const getClient = (provider?: string, fromPrivateKey?: string): Web3 => {
    let web3: Web3

    if (args?.client) {
      web3 = args?.client
    } else {
      const endpoint = httpHelper.rpcEndpoint(args.blockchain, OpenAPI.BASE, TATUM_API_CONSTANTS.API_KEY)

      web3 = new Web3(provider || endpoint)
    }

    if (fromPrivateKey) {
      web3.eth.accounts.wallet.add(fromPrivateKey)
      web3.eth.defaultAccount = web3.eth.accounts.wallet[0].address
    }
    return web3
  }
  return {
    getClient,
    async getGasPriceInWei(): Promise<string> {
      const client = getClient()
      const gasPrice = await client.eth.getGasPrice()

      return new BigNumber(gasPrice).precision(8).toString()
    },
  }
}
