import { BlockchainCeloService } from '@tatumio/api-client'
import { EvmBasedBlockchain } from '@tatumio/shared-core'
import { EvmBasedWeb3, custodial as evmBasedCustodial } from '@tatumio/shared-blockchain-evm-based'
import { erc721, multiToken, native } from '../transactions'

export const celoTxService = (args: { blockchain: EvmBasedBlockchain; web3: EvmBasedWeb3 }) => {
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
      ...evmBasedCustodial({
        ...args,
        broadcastFunction: BlockchainCeloService.celoBroadcast,
      }),
    },
  }
}
