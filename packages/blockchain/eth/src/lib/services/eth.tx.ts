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
import {EthereumService} from '@tatumio/api-client'
export const ethTx = (args: { blockchain: EvmBasedBlockchain; web3: EvmBasedWeb3 }) => {
  return {
    native: {
      ...native({
        ...args,
        broadcastFunction: EthereumService.ethBroadcast,
      }),
    },
    erc20: {
      ...erc20({
        ...args,
        broadcastFunction: EthereumService.ethBroadcast,
      }),
    },
    erc721: {
      ...erc721({
        ...args,
        broadcastFunction: EthereumService.ethBroadcast,
      }),
    },
    multiToken: {
      ...multiToken({
        ...args,
        broadcastFunction: EthereumService.ethBroadcast,
      }),
    },
    custodial: {
      ...custodial({
        ...args,
        broadcastFunction: EthereumService.ethBroadcast,
      }),
    },
    gasPump: {
      ...gasPump({
        ...args,
        broadcastFunction: EthereumService.ethBroadcast,
      }),
    },
    smartContract: {
      ...smartContract({
        ...args,
        broadcastFunction: EthereumService.ethBroadcast,
      }),
    },
  }
}
