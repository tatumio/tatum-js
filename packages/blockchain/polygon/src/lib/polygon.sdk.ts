import { evmBasedMarketplace, evmBasedSdk } from '@tatumio/shared-blockchain-evm-based'
import { Blockchain, EvmBasedBlockchain, Web3Request, Web3Response } from '@tatumio/shared-core'
import {
  BlockchainFeesService,
  BlockchainUtilsService,
  FungibleTokensErc20OrCompatibleService,
  PolygonService,
} from '@tatumio/api-client'
import { SDKArguments } from '@tatumio/shared-abstract-sdk'
import { polygonWeb3 } from './services/polygon.web3'
import { polygonKmsService } from './services/polygon.kms'
import { polygonTxService } from './services/polygon.tx'
import { polygonAuctionService } from './services/polygon.auction'
import { virtualAccountService } from './services/polygon.virtualAccount'

const blockchain: EvmBasedBlockchain = Blockchain.POLYGON

export const TatumPolygonSDK = (args: SDKArguments) => {
  const web3 = polygonWeb3({ blockchain })
  const api = PolygonService
  const txService = polygonTxService({ blockchain, web3 })
  const virtualAccount = virtualAccountService({ blockchain, web3 })
  const { nft, ...evmSdk } = evmBasedSdk({ ...args, blockchain, web3 })

  return {
    ...evmSdk,
    api,
    kms: polygonKmsService({ blockchain, web3 }),
    transaction: txService.native,
    erc20: {
      ...txService.erc20,
      getErc20TransactionByAddress: FungibleTokensErc20OrCompatibleService.erc20GetTransactionByAddress,
      getErc20AccountBalance: FungibleTokensErc20OrCompatibleService.erc20GetBalance,
      getErc20AccountBalances: FungibleTokensErc20OrCompatibleService.erc20GetBalanceAddress,
    },
    nft: {
      ...txService.erc721,
      ...nft,
    },
    multiToken: txService.multiToken,
    smartContract: txService.smartContract,
    custodial: txService.custodial,
    gasPump: txService.gasPump,
    virtualAccount,
    marketplace: {
      ...evmBasedMarketplace({
        blockchain,
        web3,
        broadcastFunction: PolygonService.polygonBroadcast,
      }),
      auction: polygonAuctionService({ blockchain, web3 }),
    },
    httpDriver: async (request: Web3Request): Promise<Web3Response> => {
      return api.polygonWeb3Driver(args.apiKey, { ...request, jsonrpc: '2.0' })
    },
    blockchain: {
      broadcast: PolygonService.polygonBroadcast,
      getTransactionsCount: PolygonService.polygonGetTransactionCount,
      getCurrentBlock: PolygonService.polygonGetCurrentBlock,
      getBlock: PolygonService.polygonGetBlock,
      getBlockchainAccountBalance: PolygonService.polygonGetBalance,
      get: PolygonService.polygonGetTransaction,
      getAccountTransactions: PolygonService.polygonGetTransactionByAddress,
      estimateGas: BlockchainFeesService.polygonEstimateGas,
      smartContractInvocation: PolygonService.polygonBlockchainSmartContractInvocation,
      smartContractGetAddress: BlockchainUtilsService.scGetContractAddress,
      blockchainTransfer: PolygonService.polygonBlockchainTransfer,
      generateAddress: PolygonService.polygonGenerateAddress,
      generateAddressPrivateKey: PolygonService.polygonGenerateAddressPrivateKey,
      generateWallet: PolygonService.polygonGenerateWallet,
      web3Driver: PolygonService.polygonWeb3Driver,
    },
  }
}
