import { Blockchain } from '@tatumio/shared-core'
import { SDKArguments } from '@tatumio/abstract-sdk'
import { BlockchainCeloService } from '@tatumio/api-client'
import { celoWeb3 } from './services/celo.web3'
import { evmBasedSdk } from '@tatumio/shared-blockchain-evm-based'
import { celoKmsService } from './services/celo.kms'


const blockchain = Blockchain.ETH

export const TatumCeloSDK = (args: SDKArguments) => {
  const web3 = celoWeb3({ blockchain })
  const api = BlockchainCeloService

  return {
    ...evmBasedSdk({ ...args, blockchain, web3 }),
    api,
    kms: celoKmsService({ blockchain, web3 }),
    // transaction: ethTx({ blockchain, web3 }),
    // httpDriver: async (request: Web3Request): Promise<Web3Response> => {
    //   return api.ethWeb3Driver(args.apiKey, { ...request, jsonrpc: '2.0' })
    // },
    blockchain: {
      broadcast: BlockchainCeloService.celoBroadcast,
      getTransactionsCount: BlockchainCeloService.celoGetTransactionCount,
      getCurrentBlock: BlockchainCeloService.celoGetCurrentBlock,
      getBlock: BlockchainCeloService.celoGetBlock,
      getBlockchainAccountBalance: BlockchainCeloService.celoGetBalance,
      get: BlockchainCeloService.celoGetTransaction,
      getAccountTransactions: BlockchainCeloService.celoGetTransactionByAddress,
    },
  }
}