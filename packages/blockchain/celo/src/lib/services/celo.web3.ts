import { evmBasedWeb3 } from '@tatumio/shared-blockchain-evm-based'
import Web3 from 'web3'
import { EvmBasedBlockchain, httpHelper, THIRD_PARTY_API } from '@tatumio/shared-core'

export const celoWeb3 = (args: { blockchain: EvmBasedBlockchain; client?: Web3 }) => {
  const evmBasedWeb3Result = evmBasedWeb3(args)

  return {
    ...evmBasedWeb3Result,
    getClient(provider?: string, fromPrivateKey?: string): Web3 {
      const web3 = args.client ?? evmBasedWeb3Result.getClient(provider)

      if (fromPrivateKey) {
        web3.eth.accounts.wallet.add(fromPrivateKey)
        web3.eth.defaultAccount = web3.eth.accounts.wallet[0].address
      }

      return web3
    },
    async getGasPriceInWei(): Promise<string> {
      // TODO: Not used. Celo should be redone to extend EVM methods.
      // Instead this obtainWalletInformation is used to get gasPrice right now, in future it should be replaced maybe
      let gasStationUrl = THIRD_PARTY_API.ETH_GAS_STATION
      const gasStationApiKey = process.env['TATUM_GAS_STATION_API_KEY'] // @TODO
      if (gasStationApiKey) {
        gasStationUrl = `${gasStationUrl}?apiKey=${gasStationApiKey}`
      }

      const data = (await httpHelper.get(gasStationUrl)).data
      const gasPrice = data['average'] ?? 20

      return Web3.utils.toWei((gasPrice / 10).toString(), 'gwei')
    },
  }
}
