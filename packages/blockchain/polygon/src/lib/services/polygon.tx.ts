import { BlockchainPolygonMaticService } from '@tatumio/api-client'
import { erc20, erc721, EvmBasedWeb3 } from '@tatumio/shared-blockchain-evm-based'
import { EvmBasedBlockchain } from '@tatumio/shared-core'

export const polygonTxService = (args: { blockchain: EvmBasedBlockchain; web3: EvmBasedWeb3 }) => {
  return {
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
  }
}
