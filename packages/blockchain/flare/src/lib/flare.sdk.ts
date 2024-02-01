import { evmBasedSdk } from '@tatumio/shared-blockchain-evm-based'
import { Blockchain, Web3Request, Web3Response } from '@tatumio/shared-core'
import {
  BlockchainFeesService,
  BlockchainUtilsService,
  FlareService,
  FungibleTokensErc20OrCompatibleService,
} from '@tatumio/api-client'
import { flareWeb3 } from './services/flare.web3'
import { flareTx } from './services/flare.tx'
import { abstractSdkNft, SDKArguments } from '@tatumio/shared-abstract-sdk'

const blockchain = Blockchain.FLR

export const TatumFlareSDK = (args: SDKArguments) => {
  const web3 = flareWeb3({
    blockchain,
    apiCalls: {
      getFee: BlockchainFeesService.getBlockchainFee,
    },
  })
  const api = FlareService
  const txService = flareTx({ blockchain, web3 })
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
      return api.flareWeb3Driver(args.apiKey, { ...request, jsonrpc: '2.0' })
    },
    blockchain: {
      broadcast: FlareService.flareBroadcast,
      getTransactionsCount: FlareService.flareGetTransactionCount,
      getCurrentBlock: FlareService.flareGetCurrentBlock,
      getBlock: FlareService.flareGetBlock,
      getBlockchainAccountBalance: FlareService.flareGetBalance,
      getTransaction: FlareService.flareGetTransaction,
      estimateGas: BlockchainFeesService.flareEstimateGas,
      smartContractInvocation: FlareService.flareBlockchainSmartContractInvocation,
      smartContractGetAddress: BlockchainUtilsService.scGetContractAddress,
      getInternalTransaction: FlareService.flareGetInternalTransactionByAddress,
    },
  }
}
