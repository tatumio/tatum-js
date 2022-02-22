import { evmBasedMarketplace, evmBasedSdk } from '@tatumio/shared-blockchain-evm-based'
import { Blockchain, Web3Request, Web3Response } from '@tatumio/shared-core'
import { BlockchainKlaytnService, BlockchainFungibleTokenService } from '@tatumio/api-client'
import { SDKArguments } from '@tatumio/shared-abstract-sdk'
import { klaytnWeb3 } from './services/klaytn.web3'
import { klaytnKmsService } from './services/klaytn.kms'
import { klaytnTxService } from './services/klaytn.tx'
import { klaytnAuctionService } from './services/klaytn.auction'

const blockchain = Blockchain.KLAY

export const TatumKlaytnSDK = (args: SDKArguments) => {
  const web3 = klaytnWeb3({ blockchain })
  const txService = klaytnTxService({ blockchain, web3 })
  const { nft, ...evmSdk } = evmBasedSdk({ ...args, blockchain, web3 })

  return {
    ...evmSdk,
    kms: klaytnKmsService({ blockchain, web3 }),
    transaction: txService.native,
    erc20: {
      ...txService.erc20,
      getErc20TransactionByAddress: BlockchainFungibleTokenService.erc20GetTransactionByAddress,
      getErc20AccountBalance: BlockchainFungibleTokenService.erc20GetBalance,
    },
    nft: {
      ...txService.erc721,
      ...nft,
    },
    multiToken: txService.multiToken,
    marketplace: {
      ...evmBasedMarketplace({
        blockchain,
        web3,
        broadcastFunction: BlockchainKlaytnService.klaytnBroadcast,
      }),
      auction: klaytnAuctionService({ blockchain, web3 }),
    },
    httpDriver: async (request: Web3Request): Promise<Web3Response> => {
      return BlockchainKlaytnService.klaytnWeb3Driver(args.apiKey, { ...request, jsonrpc: '2.0' })
    },
    blockchain: {
      broadcast: BlockchainKlaytnService.klaytnBroadcast,
      getTransactionsCount: BlockchainKlaytnService.klaytnGetTransactionCount,
      getCurrentBlock: BlockchainKlaytnService.klaytnGetCurrentBlock,
      getBlock: BlockchainKlaytnService.klaytnGetBlock,
      getBlockchainAccountBalance: BlockchainKlaytnService.klaytnGetBalance,
      get: BlockchainKlaytnService.klaytnGetTransaction,
      estimateGas: BlockchainKlaytnService.klaytnEstimateGas,
    },
  }
}
