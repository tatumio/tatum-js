import { Blockchain, Web3Request, Web3Response } from '@tatumio/shared-core'
import { BlockchainSolanaService } from '@tatumio/api-client'
import { SDKArguments } from '@tatumio/shared-abstract-sdk'
import { abstractBlockchainSdk } from '@tatumio/shared-blockchain-abstract'
import { SolanaWeb3, solanaWeb3 } from './services/solana.web3'
import { solanaKmsService } from './services/solana.kms'
import { solanaTxService } from './services/solana.tx'

const blockchain = Blockchain.SOL

export const TatumSolanaSDK = (args: SDKArguments) => {
  const api = BlockchainSolanaService
  const web3: SolanaWeb3 = solanaWeb3()
  const { nft, ...abstractSdk } = abstractBlockchainSdk({ ...args, blockchain })
  const txService = solanaTxService({ web3 })

  const { 
    mintNFT,
    transferNFT,
    getNFTMetadataURI,
    getNFTRoyalty,
  } = nft;

  return {
    ...abstractSdk,
    wallet: BlockchainSolanaService.solanaGenerateWallet,
    httpDriver: async (request: Web3Request): Promise<Web3Response> => {
      return api.solanaWeb3Driver(args.apiKey, { ...request, jsonrpc: '2.0' })
    },
    kms: solanaKmsService({ web3, blockchain }),
    transaction: txService,
    nft: {
      mintNFT,
      transferNFT,
      getNFTMetadataURI,
      getNFTRoyalty,
    },
    blockchain: {
      getCurrentBlock: BlockchainSolanaService.solanaGetCurrentBlock,
      getBlock: BlockchainSolanaService.solanaGetBlock,
      getAccountBalance: BlockchainSolanaService.solanaGetBalance,
      getTransaction: BlockchainSolanaService.solanaGetTransaction,
      sendTransaction: BlockchainSolanaService.solanaBlockchainTransfer,
      generateWallet: BlockchainSolanaService.solanaGenerateWallet,
      web3Driver: BlockchainSolanaService.solanaWeb3Driver,
    },
  }
}
