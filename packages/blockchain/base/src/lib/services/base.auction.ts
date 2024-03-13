import { evmBasedAuction, EvmBasedWeb3 } from '@tatumio/shared-blockchain-evm-based'
import { EvmBasedBlockchain } from '@tatumio/shared-core'
import { BaseService } from '@tatumio/api-client'

export const baseAuctionService = (args: { blockchain: EvmBasedBlockchain; web3: EvmBasedWeb3 }) => {
  return {
    ...evmBasedAuction({ ...args, broadcastFunction: BaseService.baseBroadcast }),
  }
}
