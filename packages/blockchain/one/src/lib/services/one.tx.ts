import { BlockchainHarmonyOneService } from '@tatumio/api-client'
import { custodial, erc20, erc721, EvmBasedWeb3, marketplace } from '@tatumio/shared-blockchain-evm-based'
import { EvmBasedBlockchain } from '@tatumio/shared-core'
import { oneMultiToken } from './one.multitoken'
import { oneNative } from './one.native'
import { oneSmartContract } from './one.smartContract'

export const oneTxService = (args: { blockchain: EvmBasedBlockchain; web3: EvmBasedWeb3 }) => {
  return {
    native: oneNative(args),
    erc20: {
      ...erc20({
        ...args,
        broadcastFunction: BlockchainHarmonyOneService.oneBroadcast,
      }),
    },
    erc721: {
      ...erc721({
        ...args,
        broadcastFunction: BlockchainHarmonyOneService.oneBroadcast,
      }),
    },
    marketplace: {
      ...marketplace({
        ...args,
        broadcastFunction: BlockchainHarmonyOneService.oneBroadcast,
      }),
    },
    multiToken: oneMultiToken(args),
    custodial: {
      ...custodial({
        ...args,
        broadcastFunction: BlockchainHarmonyOneService.oneBroadcast,
      }),
    },
    smartContract: oneSmartContract(args),
  }
}
