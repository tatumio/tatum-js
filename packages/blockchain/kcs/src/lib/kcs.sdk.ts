import { evmBasedMarketplace, evmBasedSdk } from '@tatumio/shared-blockchain-evm-based'
import { Blockchain, Web3Request, Web3Response } from '@tatumio/shared-core'
import { BlockchainKcsKcsService, BlockchainFungibleTokenService } from '@tatumio/api-client'
import { SDKArguments } from '@tatumio/shared-abstract-sdk'
import { kcsWeb3 } from './services/kcs.web3'
import { kcsKmsService } from './services/kcs.kms'
import { kcsTxService } from './services/kcs.tx'
import { kcsAuctionService } from './services/kcs.auction'

const blockchain = Blockchain.KCS

export const TatumKcsSDK = (args: SDKArguments) => {
  const web3 = kcsWeb3({ blockchain })
  const api = BlockchainKcsKcsService
  const txService = kcsTxService({ blockchain, web3 })
  const { nft, ...evmSdk } = evmBasedSdk({ ...args, blockchain, web3 })

  return {
    ...evmSdk,
    api,
    kms: kcsKmsService({ blockchain, web3 }),
    transaction: txService.native,
    erc20: {
      ...txService.erc20,
      getErc20TransactionByAddress: BlockchainFungibleTokenService.erc20GetTransactionByAddress,
      getErc20AccountBalance: BlockchainFungibleTokenService.erc20GetBalance,
    },
    nft: {
      ...txService.erc721,
      ...nft,
    },
    multiToken: txService.multiToken,
    smartContract: txService.smartContract,
    marketplace: {
      ...evmBasedMarketplace({
        blockchain,
        web3,
        broadcastFunction: BlockchainKcsKcsService.kcsBroadcast,
      }),
      auction: kcsAuctionService({ blockchain, web3 }),
    },
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
      smartContractInvocation: BlockchainKcsKcsService.kcsBlockchainSmartContractInvocation,
      blockchainTransfer: BlockchainKcsKcsService.kcsBlockchainTransfer,
      generateAddress: BlockchainKcsKcsService.kcsGenerateAddress,
      generateAddressPrivateKey: BlockchainKcsKcsService.kcsGenerateAddressPrivateKey,
      generateWallet: BlockchainKcsKcsService.kcsGenerateWallet,
      web3Driver: BlockchainKcsKcsService.kcsWeb3Driver,
    },
  }
}
