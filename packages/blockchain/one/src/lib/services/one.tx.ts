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
import { HarmonyService } from '@tatumio/api-client'
import { oneUtils } from '../one.utils'

export const oneTxService = (args: { blockchain: EvmBasedBlockchain; web3: EvmBasedWeb3 }) => {
  return {
    native: {
      ...native({
        ...args,
        broadcastFunction: HarmonyService.oneBroadcast,
        transferApiMethod: HarmonyService.oneBlockchainTransfer,
        addressTransformer: oneUtils.transformAddress,
      }),
    },
    erc20: {
      ...erc20({
        ...args,
        broadcastFunction: HarmonyService.oneBroadcast,
        addressTransformer: oneUtils.transformAddress,
      }),
    },
    erc721: {
      ...erc721({
        ...args,
        broadcastFunction: HarmonyService.oneBroadcast,
        addressTransformer: oneUtils.transformAddress,
      }),
    },
    multiToken: {
      ...multiToken({
        ...args,
        broadcastFunction: HarmonyService.oneBroadcast,
        addressTransformer: oneUtils.transformAddress,
      }),
    },
    custodial: {
      ...custodial({
        ...args,
        broadcastFunction: HarmonyService.oneBroadcast,
        addressTransformer: oneUtils.transformAddress,
      }),
    },
    gasPump: {
      ...gasPump({
        ...args,
        broadcastFunction: HarmonyService.oneBroadcast,
      }),
    },
    smartContract: {
      ...smartContract({
        ...args,
        broadcastFunction: HarmonyService.oneBroadcast,
        smartContractApiMethod: HarmonyService.oneBlockchainSmartContractInvocation,
        addressTransformer: oneUtils.transformAddress,
      }),
    },
  }
}
