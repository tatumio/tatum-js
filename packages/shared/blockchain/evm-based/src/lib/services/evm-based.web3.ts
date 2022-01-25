import Web3 from 'web3'
import { TATUM_API_CONSTANTS } from '@tatumio/api-client'
import { EvmBasedBlockchain, httpHelper } from '@tatumio/shared-core'

export interface EvmBasedWeb3 {
  getClient(provider?: string): Web3
  getGasPriceInWei(): Promise<string>
}

export const evmBasedWeb3 = (args: { blockchain: EvmBasedBlockchain }) => {
  return {
    getClient(provider?: string): Web3 {
      const endpoint = httpHelper.web3Endpoint(
        args.blockchain,
        process.env.TATUM_API_URL || TATUM_API_CONSTANTS.URL,
        TATUM_API_CONSTANTS.API_KEY,
      )

      return new Web3(provider || endpoint)
    },
  }
}
