import { evmBasedMarketplace, evmBasedSdk } from '@tatumio/shared-blockchain-evm-based'
import { Blockchain, Web3Request, Web3Response } from '@tatumio/shared-core'
import { BlockchainEthereumService, BlockchainFungibleTokenService } from '@tatumio/api-client'
import { ethWeb3 } from './services/eth.web3'
import { ethKmsService } from './services/eth.kms'
import { ethTx } from './services/eth.tx'
import { SDKArguments } from '@tatumio/shared-abstract-sdk'
import { ethAuctionService } from './services/eth.auction'

const blockchain = Blockchain.ETH

export const TatumEthSDK = (args: SDKArguments) => {
  const web3 = ethWeb3({ blockchain })
  const api = BlockchainEthereumService
  const txService = ethTx({ blockchain, web3 })
  const {nft, ...evmSdk} = evmBasedSdk({ ...args, blockchain, web3 })

  return {
    ...evmSdk,
    kms: ethKmsService({ blockchain, web3 }),
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
    custodial: txService.custodial,
    marketplace: {
      ...evmBasedMarketplace({
        blockchain,
        web3,
        broadcastFunction: BlockchainEthereumService.ethBroadcast,
      }),
      auction: ethAuctionService({ blockchain, web3 }),
    },
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
      smartContractInvocation: BlockchainEthereumService.ethBlockchainSmartContractInvocation,
      blockchainTransfer: BlockchainEthereumService.ethBlockchainTransfer,
      generateAddress: BlockchainEthereumService.ethGenerateAddress,
      generateAddressPrivateKey: BlockchainEthereumService.ethGenerateAddressPrivateKey,
      generateWallet: BlockchainEthereumService.ethGenerateWallet,
      getInternalTransaction: BlockchainEthereumService.ethGetInternalTransactionByAddress,
      web3Driver: BlockchainEthereumService.ethWeb3Driver,
    },
  }
}
