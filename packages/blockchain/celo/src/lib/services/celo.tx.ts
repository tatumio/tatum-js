import {BnbSmartChainService, CeloService} from '@tatumio/api-client'
import { EvmBasedBlockchain } from '@tatumio/shared-core'
import {custodial as evmBasedCustodial, EvmBasedWeb3, gasPump} from '@tatumio/shared-blockchain-evm-based'
import { erc721, multiToken, native, erc20, smartContract } from '../transactions'

export const celoTxService = (args: { blockchain: EvmBasedBlockchain; web3: EvmBasedWeb3 }) => {
  const nativeTxs = native({
    ...args,
    broadcastFunction: CeloService.celoBroadcast,
  })
  return {
    native: {
      ...nativeTxs,
      prepare: {
        ...nativeTxs.prepare,
      },
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
    gasPump: {
      ...gasPump({
        ...args,
        broadcastFunction: BnbSmartChainService.bscBroadcast,
      }),
    },
    erc20: {
      ...erc20({
        ...args,
        broadcastFunction: CeloService.celoBroadcast,
      }),
    },
    smartContract: {
      ...smartContract({
        ...args,
        broadcastFunction: CeloService.celoBroadcast,
      }),
    },
  }
}
