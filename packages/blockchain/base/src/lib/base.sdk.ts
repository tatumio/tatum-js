import { evmBasedSdk } from '@tatumio/shared-blockchain-evm-based'
import { Blockchain, Web3Request, Web3Response } from '@tatumio/shared-core'
import {
  BlockchainUtilsService,
  BaseService,
  FungibleTokensErc20OrCompatibleService,
} from '@tatumio/api-client'
import { baseWeb3 } from './services/base.web3'
import { baseTx } from './services/base.tx'
import { abstractSdkNft, SDKArguments } from '@tatumio/shared-abstract-sdk'

const blockchain = Blockchain.BASE

export const TatumBaseSDK = (args: SDKArguments) => {
  const web3 = baseWeb3({
    blockchain,
  })
  const api = BaseService
  const txService = baseTx({ blockchain, web3 })
  const evmSdk = evmBasedSdk({ ...args, blockchain, web3 })
  const { nft, storage } = abstractSdkNft()

  return {
    ...evmSdk,
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
      smartContractInvocation: BaseService.baseBlockchainSmartContractInvocation,
      smartContractGetAddress: BlockchainUtilsService.scGetContractAddress,
    },
  }
}
