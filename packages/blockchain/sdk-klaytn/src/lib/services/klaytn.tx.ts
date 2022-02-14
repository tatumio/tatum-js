import { BlockchainKlaytnService } from '@tatumio/api-client'
import { erc20, erc721, EvmBasedWeb3, multiToken } from '@tatumio/shared-blockchain-evm-based'
import { EvmBasedBlockchain } from '@tatumio/shared-core'

export const klaytnTxService = (args: { blockchain: EvmBasedBlockchain; web3: EvmBasedWeb3 }) => {
  return {
    erc20: {
      ...erc20({
        ...args,
        broadcastFunction: BlockchainKlaytnService.klaytnBroadcast,
      }),
    },
    erc721: {
      ...erc721({
        ...args,
        broadcastFunction: BlockchainKlaytnService.klaytnBroadcast,
      }),
    },
    multiToken: {
      ...multiToken({
        ...args,
        broadcastFunction: BlockchainKlaytnService.klaytnBroadcast,
      }),
    },
  }
}
