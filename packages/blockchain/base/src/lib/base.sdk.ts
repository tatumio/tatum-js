import { evmBasedMarketplace, evmBasedSdk } from '@tatumio/shared-blockchain-evm-based'
import { Blockchain, Web3Request, Web3Response } from '@tatumio/shared-core'
import {
  BlockchainUtilsService,
  BaseService,
  FungibleTokensErc20OrCompatibleService,
} from '@tatumio/api-client'
import { baseWeb3 } from './services/base.web3'
import { baseKmsService } from './services/base.kms'
import { baseTx } from './services/base.tx'
import { abstractSdkNft, SDKArguments } from '@tatumio/shared-abstract-sdk'
import { baseAuctionService } from './services/base.auction'
import { virtualAccountService } from './services/base.virtualAccount'

const blockchain = Blockchain.BASE

export const TatumBaseSDK = (args: SDKArguments) => {
  const web3 = baseWeb3({
    blockchain,
  })
  const api = BaseService
  const txService = baseTx({ blockchain, web3 })
  const virtualAccount = virtualAccountService({ blockchain, web3 })
  const evmSdk = evmBasedSdk({ ...args, blockchain, web3 })
  const { nft, storage } = abstractSdkNft()

  return {
    ...evmSdk,
    kms: baseKmsService({ blockchain, web3 }),
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
    storage,
    multiToken: txService.multiToken,
    smartContract: txService.smartContract,
    custodial: txService.custodial,
    gasPump: txService.gasPump,
    marketplace: {
      ...evmBasedMarketplace({
        blockchain,
        web3,
        broadcastFunction: BaseService.baseBroadcast,
      }),
      auction: baseAuctionService({ blockchain, web3 }),
    },
    httpDriver: async (request: Web3Request): Promise<Web3Response> => {
      return api.baseWeb3Driver(args.apiKey, { ...request, jsonrpc: '2.0' })
    },
    blockchain: {
      broadcast: BaseService.baseBroadcast,
      getTransactionsCount: BaseService.baseGetTransactionCount,
      getCurrentBlock: BaseService.baseGetCurrentBlock,
      getBlock: BaseService.baseGetBlock,
      getBlockchainAccountBalance: BaseService.baseGetBalance,
      getTransaction: BaseService.baseGetTransaction,
      getAccountTransactions: BaseService.baseGetTransactionByAddress,
      smartContractInvocation: BaseService.baseBlockchainSmartContractInvocation,
      smartContractGetAddress: BlockchainUtilsService.scGetContractAddress,
      getInternalTransaction: BaseService.baseGetInternalTransactionByAddress,
    },
    virtualAccount,
  }
}
