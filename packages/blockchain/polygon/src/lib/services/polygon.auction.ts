import { evmBasedAuction, EvmBasedWeb3 } from '@tatumio/shared-blockchain-evm-based'
import { EvmBasedBlockchain } from '@tatumio/shared-core'
import { BlockchainPolygonMaticService } from '@tatumio/api-client'

export const polygonAuctionService = (args: { blockchain: EvmBasedBlockchain; web3: EvmBasedWeb3 }) => {
  return {
    ...evmBasedAuction({ ...args, broadcastFunction: BlockchainPolygonMaticService.polygonBroadcast }),
  }
}
