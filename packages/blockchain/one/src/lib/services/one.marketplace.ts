import { HarmonyService } from '@tatumio/api-client'
import { EvmBasedWeb3, marketplace } from '@tatumio/shared-blockchain-evm-based'
import { EvmBasedBlockchain } from '@tatumio/shared-core'
import { oneUtils } from '../one.utils'

export const oneMarketplace = (args: {
  blockchain: EvmBasedBlockchain
  web3: EvmBasedWeb3
}): ReturnType<typeof marketplace> => {
  const unpatchedMarketplace = marketplace({
    ...args,
    broadcastFunction: HarmonyService.oneBroadcast,
  })

  return {
    prepare: {
      /**
       * Approve ERC20 spending for marketplace to perform buy with ERC20 token.
       * @param body request data
       * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
       * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
       */
      approveErc20Spending: async (
        ...params: Parameters<typeof unpatchedMarketplace.prepare.approveErc20Spending>
      ) =>
        unpatchedMarketplace.prepare.approveErc20Spending({
          ...params[0],
          contractAddress: oneUtils.transformAddress(params[0].contractAddress),
          spender: oneUtils.transformAddress(params[0].spender),
        }),
      /**
       * Prepare signed transaction for deploy new smart contract for NFT marketplace logic. Smart contract enables marketplace operator to create new listing for NFT (ERC-721/1155).
       * Operator can set a fee in percentage, which will be paid on top of the price of the asset.
       * Listing can be offered for native asset - ETH, BSC, etc. - or any ERC20 token - this is configurable during listing creation.
       * Once the listing is created, seller must send the NFT asset to the smart contract.
       * Buyer will buy the asset from the listing using native asset - send assets along the buyAssetFromListing() smart contract call, or via ERC20 token.
       * Buyer of the listing must perform approval for the smart contract to access ERC20 token, before the actual buyAssetFromListing() method is called.
       * Once both assets - from buyer and seller - are in the smart contract, NFT is sent to the buyer, price is sent to the seller
       * and marketplace fee is set to the operator.
       * @param body request data
       * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
       * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
       */
      generateMarketplace: async (
        ...params: Parameters<typeof unpatchedMarketplace.prepare.generateMarketplace>
      ) =>
        unpatchedMarketplace.prepare.generateMarketplace({
          ...params[0],
          feeRecipient: oneUtils.transformAddress(params[0].feeRecipient),
        }),
      /**
       * Update marketplace fee.
       * @param body request data
       * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
       * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
       */
      updateFee: async (...params: Parameters<typeof unpatchedMarketplace.prepare.updateFee>) =>
        unpatchedMarketplace.prepare.updateFee({
          ...params[0],
          contractAddress: oneUtils.transformAddress(params[0].contractAddress),
        }),
      /**
       * Update marketplace fee recipient.
       * @param body request data
       * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
       * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
       */
      updateFeeRecipient: async (
        ...params: Parameters<typeof unpatchedMarketplace.prepare.updateFeeRecipient>
      ) =>
        unpatchedMarketplace.prepare.updateFeeRecipient({
          ...params[0],
          contractAddress: oneUtils.transformAddress(params[0].contractAddress),
          feeRecipient: oneUtils.transformAddress(params[0].feeRecipient),
        }),
      /**
       * Buy listing on the marketplace. Buyer must either send native assets with this operation, or approve ERC20 token spending before.
       * After listing is sold, it's in a pending state to be processed by the marketplace. Noone receives the assets unless the marketplace operator processes that.
       * @param body request data
       * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
       * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
       */
      buyMarketplaceListing: async (
        ...params: Parameters<typeof unpatchedMarketplace.prepare.buyMarketplaceListing>
      ) =>
        unpatchedMarketplace.prepare.buyMarketplaceListing({
          ...params[0],
          contractAddress: oneUtils.transformAddress(params[0].contractAddress),
          ...(params[0].buyer && { buyer: oneUtils.transformAddress(params[0].buyer) }),
        }),
      /**
       * Create new listing on the marketplace. Only marketplace operator can establish those on behalf of the seller of the NFT.
       * After listing is created, seller must approve the asset for spending to the marketplace smart contract.
       * Only listing for existing NFTs can be created - seller must be owner of the NFT asset.
       * @param body request data
       * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
       * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
       */
      sellMarketplaceListing: async (
        ...params: Parameters<typeof unpatchedMarketplace.prepare.sellMarketplaceListing>
      ) =>
        unpatchedMarketplace.prepare.sellMarketplaceListing({
          ...params[0],
          contractAddress: oneUtils.transformAddress(params[0].contractAddress),
          nftAddress: oneUtils.transformAddress(params[0].nftAddress),
          ...(params[0].erc20Address && { erc20Address: oneUtils.transformAddress(params[0].erc20Address) }),
        }),
      /**
       * Cancel listing on the marketplace. Only possible for the seller or the operator. There must be no buyer present for that listing. NFT asset is sent back to the seller.
       * @param body request data
       * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
       * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
       */
      cancelMarketplaceListing: async (
        ...params: Parameters<typeof unpatchedMarketplace.prepare.cancelMarketplaceListing>
      ) =>
        unpatchedMarketplace.prepare.cancelMarketplaceListing({
          ...params[0],
          contractAddress: oneUtils.transformAddress(params[0].contractAddress),
          ...(params[0].erc20Address && { erc20Address: oneUtils.transformAddress(params[0].erc20Address) }),
        }),
      /**
       * Approve NFT transfer for listing.
       * @param body request data
       * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
       * @returns transaction data to be broadcast to blockchain, or signatureId in case of Tatum KMS
       */
      approveSpending: async (...params: Parameters<typeof unpatchedMarketplace.prepare.approveSpending>) =>
        unpatchedMarketplace.prepare.approveSpending(
          {
            ...params[0],
            contractAddress: oneUtils.transformAddress(params[0].contractAddress),
            spender: oneUtils.transformAddress(params[0].spender),
          },
          params[1],
        ),
    },
    send: {
      /**
       * Approve ERC20 spending for marketplace to perform buy with ERC20 token.
       * @param body request data
       * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
       * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
       */
      approveErc20Spending: async (
        ...params: Parameters<typeof unpatchedMarketplace.send.approveErc20Spending>
      ) =>
        unpatchedMarketplace.send.approveErc20Spending({
          ...params[0],
          contractAddress: oneUtils.transformAddress(params[0].contractAddress),
          spender: oneUtils.transformAddress(params[0].spender),
        }),
      /**
       * Deploy new smart contract for NFT marketplace logic. Smart contract enables marketplace operator to create new listing for NFT (ERC-721/1155).
       * Operator can set a fee in percentage, which will be paid on top of the price of the asset.
       * Listing can be offered for native asset - ETH, BSC, etc. - or any ERC20 token - this is configurable during listing creation.
       * Once the listing is created, seller must send the NFT asset to the smart contract.
       * Buyer will buy the asset from the listing using native asset - send assets along the buyAssetFromListing() smart contract call, or via ERC20 token.
       * Buyer of the listing must perform approval for the smart contract to access ERC20 token, before the actual buyAssetFromListing() method is called.
       * Once both assets - from buyer and seller - are in the smart contract, NFT is sent to the buyer, price is sent to the seller
       * and marketplace fee is set to the operator.
       * @param body request data
       * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
       * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
       */
      generateMarketplace: async (
        ...params: Parameters<typeof unpatchedMarketplace.send.generateMarketplace>
      ) =>
        unpatchedMarketplace.send.generateMarketplace({
          ...params[0],
          feeRecipient: oneUtils.transformAddress(params[0].feeRecipient),
        }),
      /**
       * Update marketplace fee.
       * @param body request data
       * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
       * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
       */
      updateFee: async (...params: Parameters<typeof unpatchedMarketplace.prepare.updateFee>) =>
        unpatchedMarketplace.send.updateFee({
          ...params[0],
          contractAddress: oneUtils.transformAddress(params[0].contractAddress),
        }),
      /**
       * Update marketplace fee recipient.
       * @param body request data
       * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
       * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
       */
      updateFeeRecipient: async (
        ...params: Parameters<typeof unpatchedMarketplace.send.updateFeeRecipient>
      ) =>
        unpatchedMarketplace.send.updateFeeRecipient({
          ...params[0],
          contractAddress: oneUtils.transformAddress(params[0].contractAddress),
          feeRecipient: oneUtils.transformAddress(params[0].feeRecipient),
        }),
      /**
       * Buy listing on the marketplace. Buyer must either send native assets with this operation, or approve ERC20 token spending before.
       * After listing is sold, it's in a pending state to be processed by the marketplace. Noone receives the assets unless the marketplace operator processes that.
       * @param body request data
       * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
       * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
       */
      buyMarketplaceListing: async (
        ...params: Parameters<typeof unpatchedMarketplace.send.buyMarketplaceListing>
      ) =>
        unpatchedMarketplace.send.buyMarketplaceListing({
          ...params[0],
          contractAddress: oneUtils.transformAddress(params[0].contractAddress),
          ...(params[0].buyer && { buyer: oneUtils.transformAddress(params[0].buyer) }),
        }),
      /**
       * Create new listing on the marketplace. Only marketplace operator can establish those on behalf of the seller of the NFT.
       * After listing is created, seller must approve the asset for spending to the marketplace smart contract.
       * Only listing for existing NFTs can be created - seller must be owner of the NFT asset.
       * @param body request data
       * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
       * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
       */
      sellMarketplaceListing: async (
        ...params: Parameters<typeof unpatchedMarketplace.send.sellMarketplaceListing>
      ) =>
        unpatchedMarketplace.send.sellMarketplaceListing({
          ...params[0],
          contractAddress: oneUtils.transformAddress(params[0].contractAddress),
          nftAddress: oneUtils.transformAddress(params[0].nftAddress),
          ...(params[0].erc20Address && { erc20Address: oneUtils.transformAddress(params[0].erc20Address) }),
        }),
      /**
       * Cancel listing on the marketplace. Only possible for the seller or the operator. There must be no buyer present for that listing. NFT asset is sent back to the seller.
       * @param body request data
       * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
       * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
       */
      cancelMarketplaceListing: async (
        ...params: Parameters<typeof unpatchedMarketplace.send.cancelMarketplaceListing>
      ) =>
        unpatchedMarketplace.send.cancelMarketplaceListing({
          ...params[0],
          contractAddress: oneUtils.transformAddress(params[0].contractAddress),
          ...(params[0].erc20Address && { erc20Address: oneUtils.transformAddress(params[0].erc20Address) }),
        }),
      /**
       * Approve NFT transfer for listing.
       * @param body request data
       * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
       * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
       */
      auctionApproveNftTransferSignedTransaction: async (
        ...params: Parameters<typeof unpatchedMarketplace.send.auctionApproveNftTransferSignedTransaction>
      ) =>
        unpatchedMarketplace.send.auctionApproveNftTransferSignedTransaction(
          {
            ...params[0],
            contractAddress: oneUtils.transformAddress(params[0].contractAddress),
            spender: oneUtils.transformAddress(params[0].spender),
          },
          params[1],
        ),
    },
  }
}
