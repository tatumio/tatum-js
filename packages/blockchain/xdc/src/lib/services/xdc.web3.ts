import { evmBasedWeb3 } from '@tatumio/shared-blockchain-evm-based'
import Web3 from 'web3'
import { EvmBasedBlockchain, httpHelper } from '@tatumio/shared-core'
import { hexToNumber } from 'web3-utils'

export const xdcWeb3 = (args: { blockchain: EvmBasedBlockchain; client?: Web3 }) => {
  const evmBasedWeb3Result = evmBasedWeb3(args)

  return {
    ...evmBasedWeb3Result,
    async getGasPriceInWei(): Promise<string> {
      const gasStationUrl = 'https://rpc.xinfin.network/'

      try {
        const { data } = await httpHelper.post(`${gasStationUrl}gasPrice`, {
          jsonrpc: '2.0',
          method: 'eth_gasPrice',
          params: [],
          id: 1,
        })
        const asNumber = hexToNumber(data.result)
        return (data ? Web3.utils.toWei(`${asNumber}`, 'wei') : Web3.utils.toWei('0.25', 'gwei')).toString()
      } catch (e) {
        return Web3.utils.toWei('0.25', 'gwei')
      }
    },
  }
}
