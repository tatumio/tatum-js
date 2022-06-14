import { evmBasedWeb3 } from '@tatumio/shared-blockchain-evm-based'
import Web3 from 'web3'
import { httpHelper, THIRD_PARTY_API } from '@tatumio/shared-core'
import { blockchain } from '../constants'

export const polygonWeb3 = (args?: { client?: Web3 }) => {
  const evmBasedWeb3Result = evmBasedWeb3({
    blockchain,
  })

  return {
    ...evmBasedWeb3Result,
    getClient(provider?: string, fromPrivateKey?: string): Web3 {
      if (args?.client) {
        return args.client
      }

      const web3 = evmBasedWeb3Result.getClient(provider)

      if (fromPrivateKey) {
        web3.eth.accounts.wallet.add(fromPrivateKey)
        web3.eth.defaultAccount = web3.eth.accounts.wallet[0].address
      }

      return web3
    },
    async getGasPriceInWei(gasStationApiKey?: string): Promise<string> {
      let gasStationUrl = THIRD_PARTY_API.POLYGON_GAS_STATION

      const possiblyGasStationApiKey = gasStationApiKey ?? process.env['TATUM_GAS_STATION_API_KEY']
      if (possiblyGasStationApiKey) {
        gasStationUrl = `${gasStationUrl}?apiKey=${possiblyGasStationApiKey}`
      }

      const data = (await httpHelper.get(gasStationUrl)).data
      const gasPrice = Math.max(30, Math.ceil(data['fast'] ?? 20))

      return Web3.utils.toWei(gasPrice.toString(), 'gwei')
    },
  }
}
