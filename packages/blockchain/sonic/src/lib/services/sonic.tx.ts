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
import { SonicService } from '@tatumio/api-client'
export const sonicTx = (args: { blockchain: EvmBasedBlockchain; web3: EvmBasedWeb3 }) => {
  return {
    native: {
      ...native({
        ...args,
        broadcastFunction: SonicService.sonicBroadcast,
        transferApiMethod: SonicService.sonicBlockchainTransfer,
      }),
    },
    erc20: {
      ...erc20({
        ...args,
        broadcastFunction: SonicService.sonicBroadcast,
      }),
    },
    erc721: {
      ...erc721({
        ...args,
        broadcastFunction: SonicService.sonicBroadcast,
      }),
    },
    multiToken: {
      ...multiToken({
        ...args,
        broadcastFunction: SonicService.sonicBroadcast,
      }),
    },
    custodial: {
      ...custodial({
        ...args,
        broadcastFunction: SonicService.sonicBroadcast,
      }),
    },
    gasPump: {
      ...gasPump({
        ...args,
        broadcastFunction: SonicService.sonicBroadcast,
      }),
    },
    smartContract: {
      ...smartContract({
        ...args,
        broadcastFunction: SonicService.sonicBroadcast,
        smartContractApiMethod: SonicService.sonicBlockchainSmartContractInvocation,
      }),
    },
  }
}
