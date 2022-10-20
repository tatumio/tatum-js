import { Blockchain, Web3Request, Web3Response } from '@tatumio/shared-core'
import { SolanaService } from '@tatumio/api-client'
import { abstractSdkLedgerService, SDKArguments } from '@tatumio/shared-abstract-sdk'
import { abstractBlockchainSdk } from '@tatumio/shared-blockchain-abstract'
import { SolanaWeb3, solanaWeb3 } from './services/solana.web3'
import { solanaKmsService } from './services/solana.kms'
import { solanaTxService } from './services/solana.tx'
import { solanaWallet } from './services/solana.wallet'
import { solanaVirtualAccountTxService } from './services/solana.virtualAccount.tx'

const blockchain = Blockchain.SOL

export const TatumSolanaSDK = (args: SDKArguments) => {
  const api = SolanaService
  const web3: SolanaWeb3 = solanaWeb3(args.provider)
  const { nft, ...abstractSdk } = abstractBlockchainSdk({ ...args, blockchain })
  const txService = solanaTxService({ web3 })

  const { getNFTMetadataURI, getNFTRoyalty } = nft

  return {
    ...abstractSdk,
    web3,
    wallet: solanaWallet(),
    httpDriver: async (request: Web3Request): Promise<Web3Response> => {
      return api.solanaWeb3Driver(args.apiKey, { ...request, jsonrpc: '2.0' })
    },
    kms: solanaKmsService({ web3, blockchain }),
    transaction: txService,
    ledger: abstractSdkLedgerService(),
    virtualAccount: solanaVirtualAccountTxService({ web3 }),
    nft: {
      getNFTMetadataURI,
      getNFTRoyalty,
    },
    blockchain: {
      getCurrentBlock: SolanaService.solanaGetCurrentBlock,
      getBlock: SolanaService.solanaGetBlock,
      getAccountBalance: SolanaService.solanaGetBalance,
      getTransaction: SolanaService.solanaGetTransaction,
      sendTransaction: SolanaService.solanaBlockchainTransfer,
      generateWallet: SolanaService.solanaGenerateWallet,
      web3Driver: SolanaService.solanaWeb3Driver,
    },
  }
}
