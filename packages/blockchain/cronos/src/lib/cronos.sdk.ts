import { evmBasedSdk } from '@tatumio/shared-blockchain-evm-based'
import { Blockchain, Web3Request, Web3Response } from '@tatumio/shared-core'
import {
  BlockchainUtilsService,
  CronosService,
  FungibleTokensErc20OrCompatibleService,
} from '@tatumio/api-client'
import { cronosWeb3 } from './services/cronos.web3'
import { cronosTx } from './services/cronos.tx'
import { abstractSdkNft, SDKArguments } from '@tatumio/shared-abstract-sdk'

const blockchain = Blockchain.CRO

export const TatumCronosSDK = (args: SDKArguments) => {
  const web3 = cronosWeb3({
    blockchain,
  })
  const api = CronosService
  const txService = cronosTx({ blockchain, web3 })
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
      return api.cronosWeb3Driver(args.apiKey, { ...request, jsonrpc: '2.0' })
    },
    blockchain: {
      broadcast: CronosService.cronosBroadcast,
      getTransactionsCount: CronosService.cronosGetTransactionCount,
      getCurrentBlock: CronosService.cronosGetCurrentBlock,
      getBlock: CronosService.cronosGetBlock,
      getBlockchainAccountBalance: CronosService.cronosGetBalance,
      getTransaction: CronosService.cronosGetTransaction,
      smartContractInvocation: CronosService.cronosBlockchainSmartContractInvocation,
      smartContractGetAddress: BlockchainUtilsService.scGetContractAddress,
    },
  }
}
