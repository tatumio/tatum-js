import { evmBasedSdk } from '@tatumio/shared-blockchain-evm-based'
import { Blockchain, Web3Request, Web3Response } from '@tatumio/shared-core'
import { BlockchainKcsKcsService } from '@tatumio/api-client'
import { SDKArguments } from '@tatumio/abstract-sdk'
import { kcsWeb3 } from './services/kcs.web3'
import { kcsKmsService } from './services/kcs.kms'
import { kcsTxService } from './services/kcs.tx'

const blockchain = Blockchain.KCS

export const TatumKcsSDK = (args: SDKArguments) => {
  const web3 = kcsWeb3({ blockchain })
  const api = BlockchainKcsKcsService

  return {
    ...evmBasedSdk({ ...args, blockchain, web3 }),
    api,
    kms: kcsKmsService({ blockchain, web3 }),
    transaction: kcsTxService({ blockchain, web3 }),
    httpDriver: async (request: Web3Request): Promise<Web3Response> => {
      return api.kcsWeb3Driver(args.apiKey, { ...request, jsonrpc: '2.0' })
    },
    blockchain: {
      broadcast: BlockchainKcsKcsService.kcsBroadcast,
      getTransactionsCount: BlockchainKcsKcsService.kcsGetTransactionCount,
      getCurrentBlock: BlockchainKcsKcsService.kcsGetCurrentBlock,
      getBlock: BlockchainKcsKcsService.kcsGetBlock,
      getBlockchainAccountBalance: BlockchainKcsKcsService.kcsGetBalance,
      get: BlockchainKcsKcsService.kcsGetTransaction,
      estimateGas: BlockchainKcsKcsService.kcsEstimateGas,
    },
  }
}
