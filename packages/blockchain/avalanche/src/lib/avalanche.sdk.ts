import { evmBasedMarketplace, evmBasedSdk } from '@tatumio/shared-blockchain-evm-based'
import { Blockchain, Web3Request, Web3Response } from '@tatumio/shared-core'
import {
  BlockchainFeesService,
  BlockchainUtilsService,
  AvalancheService,
  FungibleTokensErc20OrCompatibleService,
} from '@tatumio/api-client'
import { avalancheWeb3 } from './services/avalanche.web3'
import { avalancheTx } from './services/avalanche.tx'
import { abstractSdkNft, SDKArguments } from '@tatumio/shared-abstract-sdk'

const blockchain = Blockchain.AVAX

export const TatumAvalancheSDK = (args: SDKArguments) => {
  const web3 = avalancheWeb3({
    blockchain,
  })
  const api = AvalancheService
  const txService = avalancheTx({ blockchain, web3 })
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
    marketplace: {
      ...evmBasedMarketplace({
        blockchain,
        web3,
        broadcastFunction: AvalancheService.avalancheBroadcast,
      }),
    },
    httpDriver: async (request: Web3Request): Promise<Web3Response> => {
      return api.avalancheWeb3Driver(args.apiKey, { ...request, jsonrpc: '2.0' })
    },
    blockchain: {
      broadcast: AvalancheService.avalancheBroadcast,
      getTransactionsCount: AvalancheService.avalancheGetTransactionCount,
      getCurrentBlock: AvalancheService.avalancheGetCurrentBlock,
      getBlock: AvalancheService.avalancheGetBlock,
      getBlockchainAccountBalance: AvalancheService.avalancheGetBalance,
      getTransaction: AvalancheService.avalancheGetTransaction,
      estimateGas: BlockchainFeesService.avalancheEstimateGas,
      smartContractInvocation: AvalancheService.avalancheBlockchainSmartContractInvocation,
      smartContractGetAddress: BlockchainUtilsService.scGetContractAddress,
    },
  }
}
