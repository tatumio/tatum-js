import { BnbSmartChainService, CeloService } from '@tatumio/api-client'
import { EvmBasedBlockchain } from '@tatumio/shared-core'
import { custodial as evmBasedCustodial, EvmBasedWeb3, native } from '@tatumio/shared-blockchain-evm-based'
import { erc721, multiToken, erc20, smartContract } from '../transactions'
import { celoGasPump } from './celo.gas.pump'

export const celoTxService = (args: { blockchain: EvmBasedBlockchain; web3: EvmBasedWeb3 }) => {
  return {
    native: {
      ...native({
        ...args,
        broadcastFunction: CeloService.celoBroadcast,
        transferApiMethod: CeloService.celoBlockchainTransfer,
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
    gasPump: {
      prepare: {
        gasPumpWalletBatch: async (testnet: boolean, body: any, provider?: string) =>
          celoGasPump(args).prepare.gasPumpBatch(body, provider, testnet),
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
        smartContractApiMethod: CeloService.celoBlockchainSmartContractInvocation,
      }),
    },
  }
}
