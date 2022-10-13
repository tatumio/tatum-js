import { XinFinService } from '@tatumio/api-client'
import {
  custodial,
  gasPump,
  erc20,
  erc721,
  EvmBasedWeb3,
  multiToken,
  native,
  smartContract,
} from '@tatumio/shared-blockchain-evm-based'
import { EvmBasedBlockchain } from '@tatumio/shared-core'

export const xdcTxService = (args: { blockchain: EvmBasedBlockchain; web3: EvmBasedWeb3 }) => {
  return {
    native: {
      ...native({
        ...args,
        broadcastFunction: XinFinService.xdcBroadcast,
      }),
    },
    erc20: {
      ...erc20({
        ...args,
        broadcastFunction: XinFinService.xdcBroadcast,
      }),
    },
    erc721: {
      ...erc721({
        ...args,
        broadcastFunction: XinFinService.xdcBroadcast,
      }),
    },
    multiToken: {
      ...multiToken({
        ...args,
        broadcastFunction: XinFinService.xdcBroadcast,
      }),
    },
    custodial: {
      ...custodial({
        ...args,
        broadcastFunction: XinFinService.xdcBroadcast,
      }),
    },
    gasPump: {
      ...gasPump({
        ...args,
        broadcastFunction: XinFinService.xdcBroadcast,
      }),
    },
    smartContract: {
      ...smartContract({
        ...args,
        broadcastFunction: XinFinService.xdcBroadcast,
      }),
    },
  }
}
