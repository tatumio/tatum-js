import { evmBasedWeb3 } from '@tatumio/shared-blockchain-evm-based'
import Web3 from 'web3'
import { EvmBasedBlockchain } from '@tatumio/shared-core'
import { BlockchainFeesService } from '@tatumio/api-client'

export const ethWeb3 = (args: {
  blockchain: EvmBasedBlockchain
  apiCalls: {
    getFee: typeof BlockchainFeesService.getBlockchainFee
  }
}) => {
  const evmBasedWeb3Result = evmBasedWeb3(args)

  return {
    ...evmBasedWeb3Result,
    getClient(provider?: string, fromPrivateKey?: string): Web3 {
      const web3 = evmBasedWeb3Result.getClient(provider)

      if (fromPrivateKey) {
        web3.eth.accounts.wallet.add(fromPrivateKey)
        web3.eth.defaultAccount = web3.eth.accounts.wallet[0].address
      }

      return web3
    },
    async getGasPriceInWei(): Promise<string> {
      return (await args.apiCalls.getFee('ETH')).medium.toString()
    },
  }
}
