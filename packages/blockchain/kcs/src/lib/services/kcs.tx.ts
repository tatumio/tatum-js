import { KuCoinService } from '@tatumio/api-client'
import {
  erc20,
  erc721,
  EvmBasedWeb3,
  multiToken,
  native,
  smartContract,
} from '@tatumio/shared-blockchain-evm-based'
import { EvmBasedBlockchain } from '@tatumio/shared-core'

export const kcsTxService = (args: { blockchain: EvmBasedBlockchain; web3: EvmBasedWeb3 }) => {
  return {
    native: {
      ...native({
        ...args,
        broadcastFunction: KuCoinService.kcsBroadcast,
      }),
    },
    erc20: {
      ...erc20({
        ...args,
        broadcastFunction: KuCoinService.kcsBroadcast,
      }),
    },
    erc721: {
      ...erc721({
        ...args,
        broadcastFunction: KuCoinService.kcsBroadcast,
      }),
    },
    multiToken: {
      ...multiToken({
        ...args,
        broadcastFunction: KuCoinService.kcsBroadcast,
      }),
    },
    smartContract: {
      ...smartContract({
        ...args,
        broadcastFunction: KuCoinService.kcsBroadcast,
      }),
    },
  }
}
