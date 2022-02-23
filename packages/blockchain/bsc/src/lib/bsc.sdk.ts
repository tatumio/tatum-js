import { evmBasedSdk, evmBasedMarketplace } from '@tatumio/shared-blockchain-evm-based'
import { Blockchain, Web3Request, Web3Response } from '@tatumio/shared-core'
import { BlockchainBscService, BlockchainFungibleTokenService } from '@tatumio/api-client'
import { SDKArguments } from '@tatumio/shared-abstract-sdk'
import { bscWeb3 } from './services/bsc.web3'
import { bscKmsService } from './services/bsc.kms'
import { bscTxService } from './services/bsc.tx'
import { bscAuctionService } from './services/bsc.auction'

const blockchain = Blockchain.BSC

export const TatumBscSDK = (args: SDKArguments) => {
  const web3 = bscWeb3({ blockchain })
  const api = BlockchainBscService
  const txService = bscTxService({ blockchain, web3 })
  const { nft, ...evmSdk } = evmBasedSdk({ ...args, blockchain, web3 })

  return {
    ...evmSdk,
    kms: bscKmsService({ blockchain, web3 }),
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
    smartContract: txService.smartContract,
    multiToken: txService.multiToken,
    custodial: txService.custodial,
    marketplace: {
      auction: bscAuctionService({ blockchain, web3 }),
      ...evmBasedMarketplace({
        blockchain,
        web3,
        broadcastFunction: BlockchainBscService.bscBroadcast,
      }),
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
      smartContractInvocation: BlockchainBscService.bscBlockchainSmartContractInvocation,
      blockchainTransfer: BlockchainBscService.bscBlockchainTransfer,
      generateAddress: BlockchainBscService.bscGenerateAddress,
      generateAddressPrivateKey: BlockchainBscService.bscGenerateAddressPrivateKey,
      generateWallet: BlockchainBscService.bscGenerateWallet,
      web3Driver: BlockchainBscService.bscWeb3Driver,
    },
  }
}
