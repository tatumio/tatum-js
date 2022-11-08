import { EvmBasedBlockchain } from '@tatumio/shared-core'
import { evmBasedWallet } from '@tatumio/shared-blockchain-evm-based'
import { oneUtils } from '../one.utils'

export const oneWallet = (args: { blockchain: EvmBasedBlockchain }) => {
  const evmWallet = evmBasedWallet(args)

  return {
    ...evmWallet,
    /**
     * Transform HEX address to Bech32 ONE address format
     */
    toBech32Address(address: string) {
      return oneUtils.transformAddress(address)
    },
  }
}
