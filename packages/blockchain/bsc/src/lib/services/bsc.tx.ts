import { BlockchainBscService } from '@tatumio/api-client'
import { erc20, EvmBasedWeb3, erc721 } from '@tatumio/shared-blockchain-evm-based'
import { EvmBasedBlockchain } from '@tatumio/shared-core'

export const bscTxService = (args: { blockchain: EvmBasedBlockchain; web3: EvmBasedWeb3 }) => {
  return {
    erc20: {
      ...erc20({
        ...args,
        broadcastFunction: BlockchainBscService.bscBroadcast,
      }),
    },
    erc721: {
      ...erc721({
        ...args,
        broadcastFunction: BlockchainBscService.bscBroadcast,
      }),
    },
  }
}
