import { evmBasedMarketplace, evmBasedSdk } from '@tatumio/shared-blockchain-evm-based'
import { Blockchain, Web3Request, Web3Response } from '@tatumio/shared-core'
import {
  BlockchainFeesService,
  BlockchainUtilsService,
  OptimismService,
  FungibleTokensErc20OrCompatibleService,
} from '@tatumio/api-client'
import { optimismWeb3 } from './services/optimism.web3'
import { optimismTx } from './services/optimism.tx'
import { abstractSdkNft, SDKArguments } from '@tatumio/shared-abstract-sdk'

const blockchain = Blockchain.OPTIMISM

export const TatumOptimismSDK = (args: SDKArguments) => {
  const web3 = optimismWeb3({
    blockchain,
  })
  const api = OptimismService
  const txService = optimismTx({ blockchain, web3 })
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
    httpDriver: async (request: Web3Request): Promise<Web3Response> => {
      return api.optimismWeb3Driver(args.apiKey, { ...request, jsonrpc: '2.0' })
    },
    blockchain: {
      broadcast: OptimismService.optimismBroadcast,
      getTransactionsCount: OptimismService.optimismGetTransactionCount,
      getCurrentBlock: OptimismService.optimismGetCurrentBlock,
      getBlock: OptimismService.optimismGetBlock,
      getBlockchainAccountBalance: OptimismService.optimismGetBalance,
      getTransaction: OptimismService.optimismGetTransaction,
      smartContractInvocation: OptimismService.optimismBlockchainSmartContractInvocation,
      smartContractGetAddress: BlockchainUtilsService.scGetContractAddress,
    },
  }
}
