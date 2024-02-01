import { EvmBasedBlockchain } from '@tatumio/shared-core'
import {
  erc20,
  erc721,
  EvmBasedWeb3,
  multiToken,
  native,
  smartContract,
} from '@tatumio/shared-blockchain-evm-based'
import { FlareService } from '@tatumio/api-client'
export const flareTx = (args: { blockchain: EvmBasedBlockchain; web3: EvmBasedWeb3 }) => {
  return {
    native: {
      ...native({
        ...args,
        broadcastFunction: FlareService.flareBroadcast,
        transferApiMethod: FlareService.flareBlockchainTransfer,
      }),
    },
    erc20: {
      ...erc20({
        ...args,
        broadcastFunction: FlareService.flareBroadcast,
      }),
    },
    erc721: {
      ...erc721({
        ...args,
        broadcastFunction: FlareService.flareBroadcast,
      }),
    },
    multiToken: {
      ...multiToken({
        ...args,
        broadcastFunction: FlareService.flareBroadcast,
      }),
    },
    smartContract: {
      ...smartContract({
        ...args,
        broadcastFunction: FlareService.flareBroadcast,
        smartContractApiMethod: FlareService.flareBlockchainSmartContractInvocation,
      }),
    },
  }
}
