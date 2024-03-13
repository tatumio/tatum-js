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
import { BaseService } from '@tatumio/api-client'
export const baseTx = (args: { blockchain: EvmBasedBlockchain; web3: EvmBasedWeb3 }) => {
  return {
    native: {
      ...native({
        ...args,
        broadcastFunction: BaseService.baseBroadcast,
        transferApiMethod: BaseService.baseBlockchainTransfer,
      }),
    },
    erc20: {
      ...erc20({
        ...args,
        broadcastFunction: BaseService.baseBroadcast,
      }),
    },
    erc721: {
      ...erc721({
        ...args,
        broadcastFunction: BaseService.baseBroadcast,
      }),
    },
    multiToken: {
      ...multiToken({
        ...args,
        broadcastFunction: BaseService.baseBroadcast,
      }),
    },
    custodial: {
      ...custodial({
        ...args,
        broadcastFunction: BaseService.baseBroadcast,
      }),
    },
    gasPump: {
      ...gasPump({
        ...args,
        broadcastFunction: BaseService.baseBroadcast,
      }),
    },
    smartContract: {
      ...smartContract({
        ...args,
        broadcastFunction: BaseService.baseBroadcast,
        smartContractApiMethod: BaseService.baseBlockchainSmartContractInvocation,
      }),
    },
  }
}
