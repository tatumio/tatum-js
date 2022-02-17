import { BlockchainCeloService } from '@tatumio/api-client'
import { EvmBasedBlockchain } from '@tatumio/shared-core'
import { erc721, multiToken, native } from '../transactions'
import { custodial } from '../transactions/custodial'

export const celoTxService = (args: { blockchain: EvmBasedBlockchain }) => {
  return {
    native: {
      ...native({
        ...args,
        broadcastFunction: BlockchainCeloService.celoBroadcast,
      }),
    },
    erc721: {
      ...erc721({
        ...args,
        broadcastFunction: BlockchainCeloService.celoBroadcast,
      }),
    },
    multiToken: {
      ...multiToken({
        ...args,
        broadcastFunction: BlockchainCeloService.celoBroadcast,
      }),
    },
    custodial: {
      ...custodial({
        ...args,
        broadcastFunction: BlockchainCeloService.celoBroadcast,
      }),
    },
  }
}
