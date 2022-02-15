import { evmBasedMarketplace, evmBasedSdk } from '@tatumio/shared-blockchain-evm-based'
import { Blockchain, Web3Request, Web3Response } from '@tatumio/shared-core'
import { BlockchainEthereumService } from '@tatumio/api-client'
import { ethWeb3 } from './services/eth.web3'
import { ethKmsService } from './services/eth.kms'
import { ethTx } from './services/eth.tx'
import { SDKArguments } from '@tatumio/shared-abstract-sdk'
import { ethAuctionService } from './services/eth.auction'

const blockchain = Blockchain.ETH

export const TatumEthSDK = (args: SDKArguments) => {
  const web3 = ethWeb3({ blockchain })
  const api = BlockchainEthereumService

  return {
    ...evmBasedSdk({ ...args, blockchain, web3 }),
    api,
    kms: ethKmsService({ blockchain, web3 }),
    transaction: ethTx({ blockchain, web3 }),
    marketplace: evmBasedMarketplace({
      blockchain,
      web3,
      broadcastFunction: BlockchainEthereumService.ethBroadcast,
    }),
    auction: ethAuctionService({ blockchain, web3 }),
    httpDriver: async (request: Web3Request): Promise<Web3Response> => {
      return api.ethWeb3Driver(args.apiKey, { ...request, jsonrpc: '2.0' })
    },
    blockchain: {
      broadcast: BlockchainEthereumService.ethBroadcast,
      getTransactionsCount: BlockchainEthereumService.ethGetTransactionCount,
      getCurrentBlock: BlockchainEthereumService.ethGetCurrentBlock,
      getBlock: BlockchainEthereumService.ethGetBlock,
      getBlockchainAccountBalance: BlockchainEthereumService.ethGetBalance,
      get: BlockchainEthereumService.ethGetTransaction,
      getAccountTransactions: BlockchainEthereumService.ethGetTransactionByAddress,
      estimateGas: BlockchainEthereumService.ethEstimateGas,
      estimateGasBatch: BlockchainEthereumService.ethEstimateGasBatch,
    },
  }
}
