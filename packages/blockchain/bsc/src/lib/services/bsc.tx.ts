import { BnbSmartChainService } from '@tatumio/api-client'
import {
  custodial,
  erc20,
  erc721,
  EvmBasedWeb3,
  multiToken,
  native,
  smartContract,
} from '@tatumio/shared-blockchain-evm-based'
import { EvmBasedBlockchain } from '@tatumio/shared-core'

export const bscTxService = (args: { blockchain: EvmBasedBlockchain; web3: EvmBasedWeb3 }) => {
  return {
    native: {
      ...native({
        ...args,
        broadcastFunction: BnbSmartChainService.bscBroadcast,
      }),
    },
    erc20: {
      ...erc20({
        ...args,
        broadcastFunction: BnbSmartChainService.bscBroadcast,
      }),
    },
    erc721: {
      ...erc721({
        ...args,
        broadcastFunction: BnbSmartChainService.bscBroadcast,
      }),
    },
    multiToken: {
      ...multiToken({
        ...args,
        broadcastFunction: BnbSmartChainService.bscBroadcast,
      }),
    },
    custodial: {
      ...custodial({
        ...args,
        broadcastFunction: BnbSmartChainService.bscBroadcast,
      }),
    },
    smartContract: {
      ...smartContract({
        ...args,
        broadcastFunction: BnbSmartChainService.bscBroadcast,
      }),
    },
  }
}
