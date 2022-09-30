import { CeloService } from '@tatumio/api-client'
import { EvmBasedBlockchain } from '@tatumio/shared-core'
import {
  custodial as evmBasedCustodial,
  evmBasedUtils,
  EvmBasedWeb3,
  gasPump
} from '@tatumio/shared-blockchain-evm-based'
import { erc721, multiToken, native, erc20, smartContract } from '../transactions'
import {SdkErrorCode} from "@tatumio/shared-abstract-sdk";
import {celoGasPump} from "./celo.gas.pump";

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
      prepare: {
        gasPumpWalletBatch: async (body: any, provider?: string, testnet?: boolean) =>
          evmBasedUtils.tryCatch(
            () => celoGasPump(args).prepare.gasPumpBatch(body, provider, testnet),
            SdkErrorCode.EVM_GAS_PUMP_CANNOT_PREPARE_DEPLOY_BATCH_TX,
          ),
      },
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
