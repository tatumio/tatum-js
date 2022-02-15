import { BlockchainPolygonMaticService } from '@tatumio/api-client'
import { erc20, erc721, EvmBasedWeb3, multiToken, native } from '@tatumio/shared-blockchain-evm-based'
import { EvmBasedBlockchain } from '@tatumio/shared-core'

export const polygonTxService = (args: { blockchain: EvmBasedBlockchain; web3: EvmBasedWeb3 }) => {
  return {
    native: {
      ...native({
        ...args,
        broadcastFunction: BlockchainPolygonMaticService.polygonBroadcast,
      }),
    },
    erc20: {
      ...erc20({
        ...args,
        broadcastFunction: BlockchainPolygonMaticService.polygonBroadcast,
      }),
    },
    erc721: {
      ...erc721({
        ...args,
        broadcastFunction: BlockchainPolygonMaticService.polygonBroadcast,
      }),
    },
    multiToken: {
      ...multiToken({
        ...args,
        broadcastFunction: BlockchainPolygonMaticService.polygonBroadcast,
      }),
    },
  }
}
