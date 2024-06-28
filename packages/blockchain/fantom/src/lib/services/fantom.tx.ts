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
import { FantomService } from '@tatumio/api-client'
export const fantomTx = (args: { blockchain: EvmBasedBlockchain; web3: EvmBasedWeb3 }) => {
  return {
    native: {
      ...native({
        ...args,
        broadcastFunction: FantomService.fantomBroadcast,
        transferApiMethod: FantomService.fantomBlockchainTransfer,
      }),
    },
    erc20: {
      ...erc20({
        ...args,
        broadcastFunction: FantomService.fantomBroadcast,
      }),
    },
    erc721: {
      ...erc721({
        ...args,
        broadcastFunction: FantomService.fantomBroadcast,
      }),
    },
    multiToken: {
      ...multiToken({
        ...args,
        broadcastFunction: FantomService.fantomBroadcast,
      }),
    },
    custodial: {
      ...custodial({
        ...args,
        broadcastFunction: FantomService.fantomBroadcast,
      }),
    },
    gasPump: {
      ...gasPump({
        ...args,
        broadcastFunction: FantomService.fantomBroadcast,
      }),
    },
    smartContract: {
      ...smartContract({
        ...args,
        broadcastFunction: FantomService.fantomBroadcast,
        smartContractApiMethod: FantomService.fantomBlockchainSmartContractInvocation,
      }),
    },
  }
}
