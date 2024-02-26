import { evmBasedWeb3 } from '@tatumio/shared-blockchain-evm-based'
import Web3 from 'web3'
import { EvmBasedBlockchain } from '@tatumio/shared-core'
import BigNumber from 'bignumber.js'

export const xdcWeb3 = (args: { blockchain: EvmBasedBlockchain; client?: Web3 }) => {
  const evmBasedWeb3Result = evmBasedWeb3(args)

  return {
    ...evmBasedWeb3Result,
    async getGasPriceInWei(): Promise<string> {
      try {
        const gasPriceInWei = await evmBasedWeb3Result.getGasPriceInWei()
        return BigNumber(gasPriceInWei).times(2).toString()
      } catch (e) {
        return '20000000000'
      }
    },
  }
}
