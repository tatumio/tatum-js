import { BlockchainKcsKcsService } from '@tatumio/api-client'
import { erc20, erc721, EvmBasedWeb3, multiToken, smartContract, native } from '@tatumio/shared-blockchain-evm-based'
import { EvmBasedBlockchain } from '@tatumio/shared-core'

export const kcsTxService = (args: { blockchain: EvmBasedBlockchain; web3: EvmBasedWeb3 }) => {
  return {
    native: {
      ...native({
        ...args,
        broadcastFunction: BlockchainKcsKcsService.kcsBroadcast,
      }),
    },
    erc20: {
      ...erc20({
        ...args,
        broadcastFunction: BlockchainKcsKcsService.kcsBroadcast,
      }),
    },
    erc721: {
      ...erc721({
        ...args,
        broadcastFunction: BlockchainKcsKcsService.kcsBroadcast,
      }),
    },
    multiToken: {
      ...multiToken({
        ...args,
        broadcastFunction: BlockchainKcsKcsService.kcsBroadcast,
      }),
    },
    smartContract: {
      ...smartContract({
        ...args,
        broadcastFunction: BlockchainKcsKcsService.kcsBroadcast,
      }),
    },
  }
}
