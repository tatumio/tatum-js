import { evmBasedMarketplace, evmBasedSdk } from '@tatumio/shared-blockchain-evm-based'
import { Blockchain, Web3Request, Web3Response } from '@tatumio/shared-core'
import {
  BlockchainFeesService,
  BlockchainUtilsService,
  BnbSmartChainService,
  FungibleTokensErc20OrCompatibleService,
} from '@tatumio/api-client'
import { abstractSdkNft, SDKArguments } from '@tatumio/shared-abstract-sdk'
import { bscWeb3 } from './services/bsc.web3'
import { bscKmsService } from './services/bsc.kms'
import { bscTxService } from './services/bsc.tx'
import { bscAuctionService } from './services/bsc.auction'
import { virtualAccountService } from './services/bsc.virtualAccount'

const blockchain = Blockchain.BSC

export const TatumBscSDK = (args: SDKArguments) => {
  const web3 = bscWeb3({ blockchain })
  const api = BnbSmartChainService
  const virtualAccount = virtualAccountService({ blockchain, web3 })
  const txService = bscTxService({ blockchain, web3 })
  const evmSdk = evmBasedSdk({ ...args, blockchain, web3 })
  const { nft, storage } = abstractSdkNft()

  return {
    ...evmSdk,
    kms: bscKmsService({ blockchain, web3 }),
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
    storage,
    smartContract: txService.smartContract,
    multiToken: txService.multiToken,
    custodial: txService.custodial,
    gasPump: txService.gasPump,
    marketplace: {
      auction: bscAuctionService({ blockchain, web3 }),
      ...evmBasedMarketplace({
        blockchain,
        web3,
        broadcastFunction: BnbSmartChainService.bscBroadcast,
      }),
    },
    httpDriver: async (request: Web3Request): Promise<Web3Response> => {
      return api.bscWeb3Driver(args.apiKey, { ...request, jsonrpc: '2.0' })
    },
    blockchain: {
      broadcast: BnbSmartChainService.bscBroadcast,
      getTransactionsCount: BnbSmartChainService.bscGetTransactionCount,
      getCurrentBlock: BnbSmartChainService.bscGetCurrentBlock,
      getBlock: BnbSmartChainService.bscGetBlock,
      getBlockchainAccountBalance: BnbSmartChainService.bscGetBalance,
      getTransaction: BnbSmartChainService.bscGetTransaction,
      estimateGas: BlockchainFeesService.bscEstimateGas,
      smartContractInvocation: BnbSmartChainService.bscBlockchainSmartContractInvocation,
      smartContractGetAddress: BlockchainUtilsService.scGetContractAddress,
    },
    virtualAccount,
  }
}
