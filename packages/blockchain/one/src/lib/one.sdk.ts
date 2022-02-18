import { SDKArguments } from '@tatumio/shared-abstract-sdk'
import { Blockchain, EvmBasedBlockchain, Web3Request, Web3Response } from '@tatumio/shared-core'
import { BlockchainHarmonyOneService } from '@tatumio/api-client'
import { oneWeb3 } from './services/one.web3'
import { evmBasedSdk, evmBasedMarketplace } from '@tatumio/shared-blockchain-evm-based'
import { oneKmsService } from './services/one.kms'
import { oneTxService } from './services/one.tx'
import { oneAuctionService } from './services/one.auction'

const blockchain: EvmBasedBlockchain = Blockchain.HARMONY

export const TatumOneSDK = (args: SDKArguments) => {
  const web3 = oneWeb3({ blockchain })
  const api = BlockchainHarmonyOneService
  const txService = oneTxService({ blockchain, web3 })

  return {
    ...evmBasedSdk({ ...args, blockchain, web3 }),
    api,
    kms: oneKmsService({ blockchain, web3 }),
    transaction: txService.native,
    erc20: txService.erc20,
    erc721: txService.erc721,
    multiToken: txService.multiToken,
    smartContract: txService.smartContract,
    custodial: txService.custodial,
    marketplace: {
      ...evmBasedMarketplace({
        blockchain,
        web3,
        broadcastFunction: BlockchainHarmonyOneService.oneBroadcast,
      }),
      auction: oneAuctionService({ blockchain, web3 }),
    },
    httpDriver: async (request: Web3Request): Promise<Web3Response> => {
      return api.oneWeb3Driver(args.apiKey, { ...request, jsonrpc: '2.0' })
    },
    blockchain: {
      broadcast: BlockchainHarmonyOneService.oneBroadcast,
      getTransactionsCount: BlockchainHarmonyOneService.oneGetTransactionCount,
      getCurrentBlock: BlockchainHarmonyOneService.oneGetCurrentBlock,
      getBlock: BlockchainHarmonyOneService.oneGetBlock,
      getBlockchainAccountBalance: BlockchainHarmonyOneService.oneGetBalance,
      get: BlockchainHarmonyOneService.oneGetTransaction,
    },
  }
}
