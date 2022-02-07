import { evmBasedSdk } from '@tatumio/shared-blockchain-evm-based'
import { Blockchain, Web3Request, Web3Response } from '@tatumio/shared-core'
import { BlockchainPolygonMaticService } from '@tatumio/api-client'
import { SDKArguments } from '@tatumio/shared-abstract-sdk'
import { polygonWeb3 } from './services/polygon.web3'
import { polygonKmsService } from './services/polygon.kms'
import { polygonTxService } from './services/polygon.tx'
import { polygonAuctionService } from './services/polygon.auction'

const blockchain = Blockchain.POLYGON

export const TatumPolygonSDK = (args: SDKArguments) => {
  const web3 = polygonWeb3({ blockchain })
  const api = BlockchainPolygonMaticService

  return {
    ...evmBasedSdk({ ...args, blockchain, web3 }),
    api,
    kms: polygonKmsService({ blockchain, web3 }),
    transaction: polygonTxService({ blockchain, web3 }),
    auction: polygonAuctionService({ blockchain, web3 }),
    httpDriver: async (request: Web3Request): Promise<Web3Response> => {
      return api.polygonWeb3Driver(args.apiKey, { ...request, jsonrpc: '2.0' })
    },
    blockchain: {
      broadcast: BlockchainPolygonMaticService.polygonBroadcast,
      getTransactionsCount: BlockchainPolygonMaticService.polygonGetTransactionCount,
      getCurrentBlock: BlockchainPolygonMaticService.polygonGetCurrentBlock,
      getBlock: BlockchainPolygonMaticService.polygonGetBlock,
      getBlockchainAccountBalance: BlockchainPolygonMaticService.polygonGetBalance,
      get: BlockchainPolygonMaticService.polygonGetTransaction,
      getAccountTransactions: BlockchainPolygonMaticService.polygonGetTransactionByAddress,
      estimateGas: BlockchainPolygonMaticService.polygonEstimateGas,
    },
  }
}
