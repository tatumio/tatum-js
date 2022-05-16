import { CeloService } from '@tatumio/api-client'
import { EvmBasedBlockchain } from '@tatumio/shared-core'
import { custodial as evmBasedCustodial, EvmBasedWeb3 } from '@tatumio/shared-blockchain-evm-based'
import { erc721, multiToken, native } from '../transactions'

export const celoTxService = (args: { blockchain: EvmBasedBlockchain; web3: EvmBasedWeb3 }) => {
  return {
    native: {
      ...native({
        ...args,
        broadcastFunction: CeloService.celoBroadcast,
      }),
    },
    erc721: {
      ...erc721({
        ...args,
        broadcastFunction: CeloService.celoBroadcast,
      }),
    },
    multiToken: {
      ...multiToken({
        ...args,
        broadcastFunction: CeloService.celoBroadcast,
      }),
    },
    custodial: {
      ...evmBasedCustodial({
        ...args,
        broadcastFunction: CeloService.celoBroadcast,
      }),
    },
  }
}
