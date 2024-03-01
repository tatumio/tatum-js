import { EvmBasedBlockchain } from '@tatumio/shared-core'
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
import { CronosService } from '@tatumio/api-client'
export const cronosTx = (args: { blockchain: EvmBasedBlockchain; web3: EvmBasedWeb3 }) => {
  return {
    native: {
      ...native({
        ...args,
        broadcastFunction: CronosService.cronosBroadcast,
        transferApiMethod: CronosService.cronosBlockchainTransfer,
      }),
    },
    erc20: {
      ...erc20({
        ...args,
        broadcastFunction: CronosService.cronosBroadcast,
      }),
    },
    erc721: {
      ...erc721({
        ...args,
        broadcastFunction: CronosService.cronosBroadcast,
      }),
    },
    multiToken: {
      ...multiToken({
        ...args,
        broadcastFunction: CronosService.cronosBroadcast,
      }),
    },
    custodial: {
      ...custodial({
        ...args,
        broadcastFunction: CronosService.cronosBroadcast,
      }),
    },
    gasPump: {
      ...gasPump({
        ...args,
        broadcastFunction: CronosService.cronosBroadcast,
      }),
    },
    smartContract: {
      ...smartContract({
        ...args,
        broadcastFunction: CronosService.cronosBroadcast,
        smartContractApiMethod: CronosService.cronosBlockchainSmartContractInvocation,
      }),
    },
  }
}
