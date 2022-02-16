import { BlockchainBscService } from '@tatumio/api-client'
import {
  erc20,
  EvmBasedWeb3,
  erc721,
  multiToken,
  custodial,
  smartContract,
  native,
} from '@tatumio/shared-blockchain-evm-based'
import { EvmBasedBlockchain } from '@tatumio/shared-core'

export const bscTxService = (args: { blockchain: EvmBasedBlockchain; web3: EvmBasedWeb3 }) => {
  return {
    native: {
      ...native({
        ...args,
        broadcastFunction: BlockchainBscService.bscBroadcast,
      }),
    },
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
    multiToken: {
      ...multiToken({
        ...args,
        broadcastFunction: BlockchainBscService.bscBroadcast,
      }),
    },
    custodial: {
      ...custodial({
        ...args,
        broadcastFunction: BlockchainBscService.bscBroadcast,
      }),
    },
    smartContract: {
      ...smartContract({
        ...args,
        broadcastFunction: BlockchainBscService.bscBroadcast,
      }),
    },
  }
}
