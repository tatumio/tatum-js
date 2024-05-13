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
import { OptimismService } from '@tatumio/api-client'
export const optimismTx = (args: { blockchain: EvmBasedBlockchain; web3: EvmBasedWeb3 }) => {
  return {
    native: {
      ...native({
        ...args,
        broadcastFunction: OptimismService.optimismBroadcast,
        transferApiMethod: OptimismService.optimismBlockchainTransfer,
      }),
    },
    erc20: {
      ...erc20({
        ...args,
        broadcastFunction: OptimismService.optimismBroadcast,
      }),
    },
    erc721: {
      ...erc721({
        ...args,
        broadcastFunction: OptimismService.optimismBroadcast,
      }),
    },
    multiToken: {
      ...multiToken({
        ...args,
        broadcastFunction: OptimismService.optimismBroadcast,
      }),
    },
    smartContract: {
      ...smartContract({
        ...args,
        broadcastFunction: OptimismService.optimismBroadcast,
        smartContractApiMethod: OptimismService.optimismBlockchainSmartContractInvocation,
      }),
    },
  }
}
