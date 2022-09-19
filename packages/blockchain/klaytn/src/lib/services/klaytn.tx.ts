import { KlaytnService } from '@tatumio/api-client'
import {

  custodial,
  gasPump,
  erc20,
  erc721,
  EvmBasedWeb3,
  multiToken,
  native,
  smartContract
} from '@tatumio/shared-blockchain-evm-based'
import { EvmBasedBlockchain } from '@tatumio/shared-core'

export const klaytnTxService = (args: { blockchain: EvmBasedBlockchain; web3: EvmBasedWeb3 }) => {
  return {
    native: {
      ...native({
        ...args,
        broadcastFunction: KlaytnService.klaytnBroadcast,
      }),
    },
    erc20: {
      ...erc20({
        ...args,
        broadcastFunction: KlaytnService.klaytnBroadcast,
      }),
    },
    erc721: {
      ...erc721({
        ...args,
        broadcastFunction: KlaytnService.klaytnBroadcast,
      }),
    },
    gasPump: {
      ...gasPump({
        ...args,
        broadcastFunction: KlaytnService.klaytnBroadcast,
      }),
    },
    multiToken: {
      ...multiToken({
        ...args,
        broadcastFunction: KlaytnService.klaytnBroadcast,
      }),
    },
    custodial: {
      ...custodial({
        ...args,
        broadcastFunction: KlaytnService.klaytnBroadcast,
      }),
    },
    smartContract: {
      ...smartContract({
        ...args,
        broadcastFunction: KlaytnService.klaytnBroadcast,
      }),
    },
  }
}
