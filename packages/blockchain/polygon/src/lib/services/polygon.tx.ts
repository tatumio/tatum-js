import { PolygonService } from '@tatumio/api-client'
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

export const polygonTxService = (args: { blockchain: EvmBasedBlockchain; web3: EvmBasedWeb3 }) => {
  return {
    native: {
      ...native({
        ...args,
        broadcastFunction: PolygonService.polygonBroadcast,
      }),
    },
    erc20: {
      ...erc20({
        ...args,
        broadcastFunction: PolygonService.polygonBroadcast,
      }),
    },
    erc721: {
      ...erc721({
        ...args,
        broadcastFunction: PolygonService.polygonBroadcast,
      }),
    },
    multiToken: {
      ...multiToken({
        ...args,
        broadcastFunction: PolygonService.polygonBroadcast,
      }),
    },
    custodial: {
      ...custodial({
        ...args,
        broadcastFunction: PolygonService.polygonBroadcast,
      }),
    },
    smartContract: {
      ...smartContract({
        ...args,
        broadcastFunction: PolygonService.polygonBroadcast,
      }),
    },
  }
}
