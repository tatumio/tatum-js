import { evmBasedSdk } from '@tatumio/shared-blockchain-evm-based'
import { Blockchain, Web3Request, Web3Response } from '@tatumio/shared-core'
import {
  BlockchainFeesService,
  BlockchainUtilsService,
  SonicService,
  FungibleTokensErc20OrCompatibleService,
} from '@tatumio/api-client'
import { sonicWeb3 } from './services/sonic.web3'
import { sonicTx } from './services/sonic.tx'
import { abstractSdkNft, SDKArguments } from '@tatumio/shared-abstract-sdk'

const blockchain = Blockchain.S

export const TatumSonicSDK = (args: SDKArguments) => {
  const web3 = sonicWeb3({
    blockchain,
  })
  const api = SonicService
  const txService = sonicTx({ blockchain, web3 })
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
      return api.sonicWeb3Driver(args.apiKey, { ...request, jsonrpc: '2.0' })
    },
    blockchain: {
      broadcast: SonicService.sonicBroadcast,
      getTransactionsCount: SonicService.sonicGetTransactionCount,
      getCurrentBlock: SonicService.sonicGetCurrentBlock,
      getBlock: SonicService.sonicGetBlock,
      getBlockchainAccountBalance: SonicService.sonicGetBalance,
      getTransaction: SonicService.sonicGetTransaction,
      estimateGas: BlockchainFeesService.sonicEstimateGas,
      smartContractInvocation: SonicService.sonicBlockchainSmartContractInvocation,
      smartContractGetAddress: BlockchainUtilsService.scGetContractAddress,
    },
  }
}
