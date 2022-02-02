import { evmBasedSdk } from '@tatumio/shared-blockchain-evm-based'
import { Blockchain, Web3Request, Web3Response } from '@tatumio/shared-core'
import { BlockchainBscService } from '@tatumio/api-client'
import { SDKArguments } from '@tatumio/abstract-sdk'
import { bscWeb3 } from './services/bsc.web3'
import { bscKmsService } from './services/bsc.kms'
import { bscTxService } from './services/bsc.tx'
import { bscAuctionService } from './services/bsc.auction'

const blockchain = Blockchain.BSC

export const TatumBscSDK = (args: SDKArguments) => {
  const web3 = bscWeb3({ blockchain })
  const api = BlockchainBscService

  return {
    ...evmBasedSdk({ ...args, blockchain, web3 }),
    api,
    kms: bscKmsService({ blockchain, web3 }),
    transaction: bscTxService({ blockchain, web3 }),
    nft: {
      auction: bscAuctionService({ blockchain, web3 }),
    },
    httpDriver: async (request: Web3Request): Promise<Web3Response> => {
      return api.bscWeb3Driver(args.apiKey, { ...request, jsonrpc: '2.0' })
    },
    blockchain: {
      broadcast: BlockchainBscService.bscBroadcast,
      getTransactionsCount: BlockchainBscService.bscGetTransactionCount,
      getCurrentBlock: BlockchainBscService.bscGetCurrentBlock,
      getBlock: BlockchainBscService.bscGetBlock,
      getBlockchainAccountBalance: BlockchainBscService.bscGetBalance,
      get: BlockchainBscService.bscGetTransaction,
      estimateGas: BlockchainBscService.bscEstimateGas,
    },
  }
}
