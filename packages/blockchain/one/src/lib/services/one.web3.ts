import { evmBasedWeb3 } from '@tatumio/shared-blockchain-evm-based'
import Web3 from 'web3'
import { EvmBasedBlockchain } from '@tatumio/shared-core'

export const oneWeb3 = (args: { blockchain: EvmBasedBlockchain }) => {
  const evmBasedWeb3Result = evmBasedWeb3(args)
  const getOneClient = (provider?: string, fromPrivateKey?: string): Web3 => {
    const web3 = evmBasedWeb3Result.getClient(provider)

    if (fromPrivateKey) {
      web3.eth.accounts.wallet.add(fromPrivateKey)
      web3.eth.defaultAccount = web3.eth.accounts.wallet[0].address
    }

    return web3
  }


  return {
    ...evmBasedWeb3Result,
    getClient(provider?: string, fromPrivateKey?: string): Web3 {
      return getOneClient(provider, fromPrivateKey)
    },
    async getGasPriceInWei(provider?: string): Promise<string> {
      const client = await getOneClient(provider)
      return await client.eth.getGasPrice()
    },
  }
}
