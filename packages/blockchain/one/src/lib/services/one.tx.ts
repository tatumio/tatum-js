import { BlockchainHarmonyOneService } from '@tatumio/api-client'
import {
  custodial,
  erc20,
  erc721,
  EvmBasedWeb3,
  multiToken,
  smartContract,
  marketplace,
  native,
} from '@tatumio/shared-blockchain-evm-based'
import { EvmBasedBlockchain } from '@tatumio/shared-core'

export const oneTxService = (args: { blockchain: EvmBasedBlockchain; web3: EvmBasedWeb3 }) => {
  return {
    native: {
      ...native({
        ...args,
        broadcastFunction: BlockchainHarmonyOneService.oneBroadcast,
      }),
    },
    erc20: {
      ...erc20({
        ...args,
        broadcastFunction: BlockchainHarmonyOneService.oneBroadcast,
      }),
    },
    erc721: {
      ...erc721({
        ...args,
        broadcastFunction: BlockchainHarmonyOneService.oneBroadcast,
      }),
    },
    marketplace: {
      ...marketplace({
        ...args,
        broadcastFunction: BlockchainHarmonyOneService.oneBroadcast,
      }),
    },
    multiToken: {
      ...multiToken({
        ...args,
        broadcastFunction: BlockchainHarmonyOneService.oneBroadcast,
      }),
    },
    custodial: {
      ...custodial({
        ...args,
        broadcastFunction: BlockchainHarmonyOneService.oneBroadcast,
      }),
    },
    smartContract: {
      ...smartContract({
        ...args,
        broadcastFunction: BlockchainHarmonyOneService.oneBroadcast,
      }),
    },
  }
}
