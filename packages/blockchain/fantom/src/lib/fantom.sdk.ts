import { evmBasedSdk } from '@tatumio/shared-blockchain-evm-based'
import { Blockchain, Web3Request, Web3Response } from '@tatumio/shared-core'
import {
  BlockchainUtilsService,
  FantomService,
  FungibleTokensErc20OrCompatibleService,
} from '@tatumio/api-client'
import { fantomWeb3 } from './services/fantom.web3'
import { fantomTx } from './services/fantom.tx'
import { abstractSdkNft, SDKArguments } from '@tatumio/shared-abstract-sdk'

const blockchain = Blockchain.FTM

export const TatumFantomSDK = (args: SDKArguments) => {
  const web3 = fantomWeb3({
    blockchain,
  })
  const api = FantomService
  const txService = fantomTx({ blockchain, web3 })
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
      return api.fantomWeb3Driver(args.apiKey, { ...request, jsonrpc: '2.0' })
    },
    blockchain: {
      broadcast: FantomService.fantomBroadcast,
      getTransactionsCount: FantomService.fantomGetTransactionCount,
      getCurrentBlock: FantomService.fantomGetCurrentBlock,
      getBlock: FantomService.fantomGetBlock,
      getBlockchainAccountBalance: FantomService.fantomGetBalance,
      getTransaction: FantomService.fantomGetTransaction,
      smartContractInvocation: FantomService.fantomBlockchainSmartContractInvocation,
      smartContractGetAddress: BlockchainUtilsService.scGetContractAddress,
    },
  }
}
