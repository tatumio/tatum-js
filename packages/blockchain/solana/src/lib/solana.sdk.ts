import { Blockchain, Web3Request, Web3Response } from '@tatumio/shared-core'
import { BlockchainSolanaService, MintNftSolana, TransferSolanaBlockchain } from '@tatumio/api-client'
import { SDKArguments } from '@tatumio/shared-abstract-sdk'
import { abstractBlockchainSdk } from '@tatumio/shared-blockchain-abstract'
import { SolanaWeb3, solanaWeb3 } from './services/solana.web3'
import { solanaKmsService } from './services/solana.kms'
import { solanaTxService } from './services/solana.tx'

const blockchain = Blockchain.SOL

export const TatumSolanaSDK = (args: SDKArguments) => {
  const api = BlockchainSolanaService
  const web3: SolanaWeb3 = solanaWeb3()

  return {
    ...abstractBlockchainSdk({
      ...args,
      blockchain,
    }),
    api,
    wallet: BlockchainSolanaService.solanaGenerateWallet,
    httpDriver: async (request: Web3Request): Promise<Web3Response> => {
      return api.solanaWeb3Driver(args.apiKey, { ...request, jsonrpc: '2.0' })
    },
    kms: solanaKmsService({ web3 }),
    transaction: solanaTxService({ web3 }),
    blockchain: {
      getCurrentBlock: BlockchainSolanaService.solanaGetCurrentBlock,
      getBlock: BlockchainSolanaService.solanaGetBlock,
      getAccountBalance: BlockchainSolanaService.solanaGetBalance,
      getTransaction: BlockchainSolanaService.solanaGetTransaction,
    },
  }
}
