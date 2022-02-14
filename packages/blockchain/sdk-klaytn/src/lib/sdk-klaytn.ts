import { evmBasedSdk } from '@tatumio/shared-blockchain-evm-based'
import { Blockchain, Web3Request, Web3Response } from '@tatumio/shared-core'
import { BlockchainKlaytnService } from '@tatumio/api-client'
import { SDKArguments } from '@tatumio/shared-abstract-sdk'
import { klaytnWeb3 } from './services/klaytn.web3'
import { klaytnKmsService } from './services/klaytn.kms'
import { klaytnTxService } from './services/klaytn.tx'

const blockchain = Blockchain.KLAY

export const TatumKlaytnSDK = (args: SDKArguments) => {
  const web3 = klaytnWeb3({ blockchain })
  const api = BlockchainKlaytnService

  return {
    ...evmBasedSdk({ ...args, blockchain, web3 }),
    api,
    kms: klaytnKmsService({ blockchain, web3 }),
    transaction: klaytnTxService({ blockchain, web3 }),
    httpDriver: async (request: Web3Request): Promise<Web3Response> => {
      return api.klaytnWeb3Driver(args.apiKey, { ...request, jsonrpc: '2.0' })
    },
    blockchain: {
      broadcast: BlockchainKlaytnService.klaytnBroadcast,
      getTransactionsCount: BlockchainKlaytnService.klaytnGetTransactionCount,
      getCurrentBlock: BlockchainKlaytnService.klaytnGetCurrentBlock,
      getBlock: BlockchainKlaytnService.klaytnGetBlock,
      getBlockchainAccountBalance: BlockchainKlaytnService.klaytnGetBalance,
      get: BlockchainKlaytnService.klaytnGetTransaction,
      estimateGas: BlockchainKlaytnService.klaytnEstimateGas,
    },
  }
}
