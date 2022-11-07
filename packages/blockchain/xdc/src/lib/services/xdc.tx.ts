import { XinFinService } from '@tatumio/api-client'
import {
  custodial,
  erc20,
  erc721,
  EvmBasedWeb3,
  gasPump,
  multiToken,
  native,
  smartContract,
} from '@tatumio/shared-blockchain-evm-based'
import { EvmBasedBlockchain } from '@tatumio/shared-core'
import { xdcUtil } from '../xdc.util'

export const xdcTxService = (args: { blockchain: EvmBasedBlockchain; web3: EvmBasedWeb3 }) => {
  return {
    native: {
      ...native({
        ...args,
        broadcastFunction: XinFinService.xdcBroadcast,
        transferApiMethod: XinFinService.xdcBlockchainTransfer,
        addressTransformer: xdcUtil.toHex,
      }),
    },
    erc20: {
      ...erc20({
        ...args,
        broadcastFunction: XinFinService.xdcBroadcast,
        addressTransformer: xdcUtil.toHex,
      }),
    },
    erc721: {
      ...erc721({
        ...args,
        broadcastFunction: XinFinService.xdcBroadcast,
        addressTransformer: xdcUtil.toHex,
      }),
    },
    multiToken: {
      ...multiToken({
        ...args,
        broadcastFunction: XinFinService.xdcBroadcast,
        addressTransformer: xdcUtil.toHex,
      }),
    },
    custodial: {
      ...custodial({
        ...args,
        broadcastFunction: XinFinService.xdcBroadcast,
        addressTransformer: xdcUtil.toHex,
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
        smartContractApiMethod: XinFinService.xdcBlockchainSmartContractInvocation,
        addressTransformer: xdcUtil.toHex,
      }),
    },
  }
}
