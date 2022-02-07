import { BlockchainCeloService } from '@tatumio/api-client'
import { EvmBasedBlockchain } from '@tatumio/shared-core'
import { erc721 } from '../transactions/erc721'

export const celoTxService = (args: { blockchain: EvmBasedBlockchain }) => {
  return {
    erc721: {
      ...erc721({
        ...args,
        broadcastFunction: BlockchainCeloService.celoBroadcast,
      }),
    },
  }
}
