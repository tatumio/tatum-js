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
import { AvalancheService } from '@tatumio/api-client'
export const avalancheTx = (args: { blockchain: EvmBasedBlockchain; web3: EvmBasedWeb3 }) => {
  return {
    native: {
      ...native({
        ...args,
        broadcastFunction: AvalancheService.avalancheBroadcast,
        transferApiMethod: AvalancheService.avalancheBlockchainTransfer,
      }),
    },
    erc20: {
      ...erc20({
        ...args,
        broadcastFunction: AvalancheService.avalancheBroadcast,
      }),
    },
    erc721: {
      ...erc721({
        ...args,
        broadcastFunction: AvalancheService.avalancheBroadcast,
      }),
    },
    multiToken: {
      ...multiToken({
        ...args,
        broadcastFunction: AvalancheService.avalancheBroadcast,
      }),
    },
    custodial: {
      ...custodial({
        ...args,
        broadcastFunction: AvalancheService.avalancheBroadcast,
      }),
    },
    gasPump: {
      ...gasPump({
        ...args,
        broadcastFunction: AvalancheService.avalancheBroadcast,
      }),
    },
    smartContract: {
      ...smartContract({
        ...args,
        broadcastFunction: AvalancheService.avalancheBroadcast,
        smartContractApiMethod: AvalancheService.avalancheBlockchainSmartContractInvocation,
      }),
    },
  }
}
