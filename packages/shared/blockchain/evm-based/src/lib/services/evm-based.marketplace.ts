import { ApproveErc20, BlockchainMarketplaceService } from '@tatumio/api-client'
import {
  BroadcastFunction,
  ChainSellAssetOnMarketplace,
  ChainCancelSellAssetOnMarketplace,
  ChainBuyAssetOnMarketplace,
  ChainGenerateMarketplace,
  ChainUpdateFee,
  ChainUpdateFeeRecipient,
} from '@tatumio/shared-blockchain-abstract'
import { EvmBasedBlockchain } from '@tatumio/shared-core'
import { marketplace } from '../transactions/marketplace'
import { ApproveNftTransfer } from './evm-based.auction'
import { EvmBasedWeb3 } from './evm-based.web3'

export const evmBasedMarketplace = (args: {
  blockchain: EvmBasedBlockchain
  web3: EvmBasedWeb3
  broadcastFunction: BroadcastFunction
}) => {
  return {
    prepare: {
      approveErc20Spending: (body: ApproveErc20, provider?: string) =>
        marketplace(args).prepare.approveErc20Spending(body, provider),

      approveSpending: async (body: ApproveNftTransfer, provider?: string) =>
        marketplace(args).prepare.approveSpending(body, provider),

      generateMarketplace: (body: ChainGenerateMarketplace, provider?: string) =>
        marketplace(args).prepare.generateMarketplace(body, provider),

      updateFee: (body: ChainUpdateFee, provider?: string) =>
        marketplace(args).prepare.updateFee(body, provider),

      updateFeeRecipient: (body: ChainUpdateFeeRecipient, provider?: string) =>
        marketplace(args).prepare.updateFeeRecipient(body, provider),

      createMarketplaceListing: (body: ChainSellAssetOnMarketplace, provider?: string) =>
        marketplace(args).prepare.createMarketplaceListing(body, provider),

      cancelMarketplaceListing: (body: ChainCancelSellAssetOnMarketplace, provider?: string) =>
        marketplace(args).prepare.cancelMarketplaceListing(body, provider),

      buyMarketplaceListing: (body: ChainBuyAssetOnMarketplace, provider?: string) =>
        marketplace(args).prepare.buyMarketplaceListing(body, provider),
    },

    deploy: {
      approveErc20Spending: (body: ApproveErc20, provider?: string) =>
        marketplace(args).send.approveErc20Spending(body, provider),

      generateMarketplace: (body: ChainGenerateMarketplace, provider?: string) =>
        marketplace(args).send.generateMarketplace(body, provider),

      updateFee: (body: ChainUpdateFee, provider?: string) =>
        marketplace(args).send.updateFee(body, provider),

      updateFeeRecipient: (body: ChainUpdateFeeRecipient, provider?: string) =>
        marketplace(args).send.updateFeeRecipient(body, provider),

      createMarketplaceListing: (body: ChainSellAssetOnMarketplace, provider?: string) =>
        marketplace(args).send.createMarketplaceListing(body, provider),

      cancelMarketplaceListing: (body: ChainCancelSellAssetOnMarketplace, provider?: string) =>
        marketplace(args).send.cancelMarketplaceListing(body, provider),

      buyMarketplaceListing: (body: ChainBuyAssetOnMarketplace, provider?: string) =>
        marketplace(args).send.buyMarketplaceListing(body, provider),
    },

    // @TODO
    getMarketplaceListing: BlockchainMarketplaceService.getMarketplaceListing,
    getMarketplaceListings: BlockchainMarketplaceService.getMarketplaceListings,
    getMarketplaceFee: BlockchainMarketplaceService.getMarketplaceFee,
    getMarketplaceFeeRecipient: BlockchainMarketplaceService.getMarketplaceFeeRecipient,
  }
}
