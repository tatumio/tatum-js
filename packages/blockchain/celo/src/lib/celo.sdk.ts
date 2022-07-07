import { Blockchain, Web3Request, Web3Response } from '@tatumio/shared-core'
import { SDKArguments } from '@tatumio/shared-abstract-sdk'
import { CeloService, FungibleTokensErc20OrCompatibleService } from '@tatumio/api-client'
import { celoWeb3 } from './services/celo.web3'
import { evmBasedSdk } from '@tatumio/shared-blockchain-evm-based'
import { celoKmsService } from './services/celo.kms'
import { celoTxService } from './services/celo.tx'
import { celoAuctionService } from './services/celo.auction'

const blockchain = Blockchain.CELO

export const TatumCeloSDK = (args: SDKArguments) => {
  const web3 = celoWeb3({ blockchain })
  const api = CeloService
  const txService = celoTxService({ blockchain, web3 })
  const { nft, ...evmSdk } = evmBasedSdk({ ...args, blockchain, web3 })

  return {
    ...evmSdk,
    api,
    kms: celoKmsService({ blockchain, web3 }),
    transaction: txService.native,
    erc20: {
      ...txService.erc20,
      getErc20TransactionByAddress: FungibleTokensErc20OrCompatibleService.erc20GetTransactionByAddress,
      getErc20AccountBalance: FungibleTokensErc20OrCompatibleService.erc20GetBalance,
    },
    nft: {
      ...txService.erc721,
      ...nft,
    },
    multiToken: txService.multiToken,
    custodial: txService.custodial,
    marketplace: {
      auction: celoAuctionService({ blockchain, web3 }),
    },
    httpDriver: async (request: Web3Request): Promise<Web3Response> => {
      return api.celoWeb3Driver(args.apiKey, { ...request, jsonrpc: '2.0' })
    },
    blockchain: {
      broadcast: CeloService.celoBroadcast,
      getTransactionsCount: CeloService.celoGetTransactionCount,
      getCurrentBlock: CeloService.celoGetCurrentBlock,
      getBlock: CeloService.celoGetBlock,
      getBlockchainAccountBalance: CeloService.celoGetBalance,
      get: CeloService.celoGetTransaction,
      getAccountTransactions: CeloService.celoGetTransactionByAddress,
    },
  }
}
