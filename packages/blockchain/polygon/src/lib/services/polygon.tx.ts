import { BnbSmartChainService, PolygonService } from '@tatumio/api-client'
import {
  custodial,
  erc20,
  erc721,
  EvmBasedWeb3,
  multiToken,
  native,
  smartContract,
  StoreDataTransactionBody,
  evmBasedUtils,
  gasPump,
} from '@tatumio/shared-blockchain-evm-based'
import { EvmBasedBlockchain } from '@tatumio/shared-core'

export const polygonTxService = (args: { blockchain: EvmBasedBlockchain; web3: EvmBasedWeb3 }) => {
  const nativeTxs = native({
    ...args,
    broadcastFunction: PolygonService.polygonBroadcast,
  })

  return {
    native: {
      ...nativeTxs,
      prepare: {
        ...nativeTxs.prepare,
        /**
         * Sign Polygon store data transaction with private keys locally. Nothing is broadcast to the blockchain.
         * @param body content of the transaction to broadcast.
         * @param provider url of the Polygon Server to connect to. If not set, default public server will be used.
         * @returns transaction data to be broadcast to blockchain.
         */
        storeDataTransaction: async (body: StoreDataTransactionBody, provider?: string) =>
          evmBasedUtils.storeDataTransaction(body, args.web3, provider),
      },
    },
    erc20: {
      ...erc20({
        ...args,
        broadcastFunction: PolygonService.polygonBroadcast,
      }),
    },
    erc721: {
      ...erc721({
        ...args,
        broadcastFunction: PolygonService.polygonBroadcast,
      }),
    },
    multiToken: {
      ...multiToken({
        ...args,
        broadcastFunction: PolygonService.polygonBroadcast,
      }),
    },
    custodial: {
      ...custodial({
        ...args,
        broadcastFunction: PolygonService.polygonBroadcast,
      }),
    },
    gasPump: {
      ...gasPump({
        ...args,
        broadcastFunction: BnbSmartChainService.bscBroadcast,
      }),
    },
    smartContract: {
      ...smartContract({
        ...args,
        broadcastFunction: PolygonService.polygonBroadcast,
      }),
    },
  }
}
