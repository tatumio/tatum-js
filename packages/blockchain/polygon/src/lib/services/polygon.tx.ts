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
import { blockchain } from '../constants'

export const polygonTxService = (args: { web3: EvmBasedWeb3 }) => {
  return {
    native: {
      ...native({
        blockchain,
        ...args,
        broadcastFunction: PolygonService.polygonBroadcast,
      }),
    },
    erc20: {
      ...erc20({
        blockchain,
        ...args,
        broadcastFunction: PolygonService.polygonBroadcast,
      }),
    },
    erc721: {
      ...erc721({
        blockchain,
        ...args,
        broadcastFunction: PolygonService.polygonBroadcast,
      }),
    },
    multiToken: {
      ...multiToken({
        blockchain,
        ...args,
        broadcastFunction: PolygonService.polygonBroadcast,
      }),
    },
    custodial: {
      ...custodial({
        blockchain,
        ...args,
        broadcastFunction: PolygonService.polygonBroadcast,
      }),
    },
    smartContract: {
      ...smartContract({
        blockchain,
        ...args,
        broadcastFunction: PolygonService.polygonBroadcast,
      }),
    },
  }
}
