import { evmBasedWeb3 } from '@tatumio/shared-blockchain-evm-based'
import Web3 from 'web3'
import { EvmBasedBlockchain } from '@tatumio/shared-core'

export const xdcWeb3 = (args: { blockchain: EvmBasedBlockchain; client?: Web3 }) => {
  console.log('xdcWeb3')
  return evmBasedWeb3(args)
}
