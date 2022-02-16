import { BlockchainCeloService } from '@tatumio/api-client'
import { EvmBasedWeb3, custodial as evmBasedCustodial } from '@tatumio/shared-blockchain-evm-based'
import { EvmBasedBlockchain } from '@tatumio/shared-core'
import { erc721, multiToken } from '../transactions'

export const celoTxService = (args: { blockchain: EvmBasedBlockchain; web3: EvmBasedWeb3 }) => {
  return {
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
