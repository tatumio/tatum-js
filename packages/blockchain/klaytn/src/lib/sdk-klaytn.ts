import { evmBasedMarketplace, evmBasedSdk } from '@tatumio/shared-blockchain-evm-based'
import { Blockchain, Web3Request, Web3Response } from '@tatumio/shared-core'
import {
  BlockchainFeesService,
  BlockchainUtilsService,
  FungibleTokensErc20OrCompatibleService,
  KlaytnService,
} from '@tatumio/api-client'
import { abstractSdkNft, SDKArguments } from '@tatumio/shared-abstract-sdk'
import { klaytnWeb3 } from './services/klaytn.web3'
import { klaytnKmsService } from './services/klaytn.kms'
import { klaytnTxService } from './services/klaytn.tx'
import { klaytnAuctionService } from './services/klaytn.auction'
import { virtualAccountService } from './services/klaytn.virtualAccount'

const blockchain = Blockchain.KLAY

export const TatumKlaytnSDK = (args: SDKArguments) => {
  const web3 = klaytnWeb3({ blockchain })
  const txService = klaytnTxService({ blockchain, web3 })
  const virtualAccount = virtualAccountService({ blockchain, web3 })
  const { custodialManagedWallet, ...evmSdk } = evmBasedSdk({ ...args, blockchain, web3 })
  const { nft, storage } = abstractSdkNft()

  return {
    ...evmSdk,
    kms: klaytnKmsService({ blockchain, web3 }),
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
    multiToken: txService.multiToken,
    gasPump: txService.gasPump,
    marketplace: {
      ...evmBasedMarketplace({
        blockchain,
        web3,
        broadcastFunction: KlaytnService.klaytnBroadcast,
      }),
      auction: klaytnAuctionService({ blockchain, web3 }),
    },
    httpDriver: async (request: Web3Request): Promise<Web3Response> => {
      return KlaytnService.klaytnWeb3Driver(args.apiKey, { ...request, jsonrpc: '2.0' })
    },
    blockchain: {
      broadcast: KlaytnService.klaytnBroadcast,
      getTransactionsCount: KlaytnService.klaytnGetTransactionCount,
      getCurrentBlock: KlaytnService.klaytnGetCurrentBlock,
      getBlock: KlaytnService.klaytnGetBlock,
      getBlockchainAccountBalance: KlaytnService.klaytnGetBalance,
      getTransaction: KlaytnService.klaytnGetTransaction,
      estimateGas: BlockchainFeesService.klaytnEstimateGas,
      smartContractGetAddress: BlockchainUtilsService.scGetContractAddress,
    },
    smartContract: txService.smartContract,
    virtualAccount,
  }
}
