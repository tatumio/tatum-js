import {
  prepareMarketplaceUpdateFeeAbstraction,
  prepareMarketplaceUpdateFeeRecipientAbstraction,
  prepareMarketplaceCreateListingAbstraction,
  prepareMarketplaceBuyListingAbstraction,
  prepareMarketplaceCancelListingAbstraction,
  getMarketplaceFee as getMarketplaceFeeDefi,
  getMarketplaceListing as getMarketplaceListingDefi,
  getMarketplaceFeeRecipient as getMarketplaceFeeRecipientDefi,
} from '@tatumio/tatum-defi'
import {
  Currency,
  ChainDeployMarketplaceListing,
  ChainUpdateMarketplaceFee,
  ChainUpdateMarketplaceFeeRecipient,
  ChainApproveErc20,
  ChainCreateMarketplaceListing,
  ChainInvokeMarketplaceListingOperation,
} from '@tatumio/tatum-core'
import { prepareApproveErc20 } from '../../fungible'
import { helperBroadcastTx, helperPrepareSCCall } from '../../helpers'
import { prepareDeployMarketplaceListingSignedTransaction, sendDeployMarketplaceListingSignedTransaction } from '../../transaction'

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
export const deployMarketplaceListing = async (body: ChainDeployMarketplaceListing, provider?: string) => {
  return await sendDeployMarketplaceListingSignedTransaction(body, provider)
}

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
export const prepareDeployMarketplaceListing = async (body: ChainDeployMarketplaceListing, provider?: string) => {
  return await prepareDeployMarketplaceListingSignedTransaction(body, provider)
}

/**
 * Update marketplace fee.
 * @param body request data
 * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
 * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
 */
export const prepareMarketplaceUpdateFee = async (body: ChainUpdateMarketplaceFee, provider?: string) => {
  const params = await prepareMarketplaceUpdateFeeAbstraction({ ...body, chain: Currency.ONE })
  return await helperPrepareSCCall(body, 'setMarketplaceFee', params, provider)
}

/**
 * Update marketplace fee recipient.
 * @param body request data
 * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
 * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
 */
export const prepareMarketplaceUpdateFeeRecipient = async (body: ChainUpdateMarketplaceFeeRecipient, provider?: string) => {
  const params = await prepareMarketplaceUpdateFeeRecipientAbstraction({ ...body, chain: Currency.ONE })
  return await helperPrepareSCCall(body, 'setMarketplaceFeeRecipient', params, provider)
}

/**
 * Approve ERC20 spending for marketplace to perform buy with ERC20 token.
 * @param testnet chain to work with
 * @param body request data
 * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
 * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
 */
export const prepareMarketplaceApproveErc20Spending = async (testnet: boolean, body: ChainApproveErc20, provider?: string) => {
  return prepareApproveErc20(testnet, body, provider)
}

/**
 * Create new listing on the marketplace.
 * After listing is created, seller must send the asset to the marketplace smart contract.
 * Only listing for existing NFTs can be created - seller must be owner of the NFT asset.
 * @param body request data
 * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
 * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
 */
export const prepareMarketplaceCreateListing = async (body: ChainCreateMarketplaceListing, provider?: string) => {
  const { body: validatedBody, params } = await prepareMarketplaceCreateListingAbstraction({ ...body, chain: Currency.ONE })
  return await helperPrepareSCCall(validatedBody, 'createListing', params, provider)
}

/**
 * Buy listing on the marketplace. Buyer must either send native assets with this operation, or approve ERC20 token spending before.
 * After listing is sold, it's in a pending state to be processed by the marketplace. Noone receives the assets unless the marketplace operator processes that.
 * @param body request data
 * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
 * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
 */
export const prepareMarketplaceBuyListing = async (body: ChainInvokeMarketplaceListingOperation, provider?: string) => {
  const { body: validatedBody, params, methodName } = await prepareMarketplaceBuyListingAbstraction({ ...body, chain: Currency.ONE })
  return await helperPrepareSCCall(validatedBody, methodName, params, provider)
}

/**
 * Cancel listing on the marketplace. Only possible for the seller or the operator. There must be no buyer present for that listing. NFT asset is sent back to the seller.
 * @param body request data
 * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
 * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
 */
export const prepareMarketplaceCancelListing = async (body: ChainInvokeMarketplaceListingOperation, provider?: string) => {
  const params = await prepareMarketplaceCancelListingAbstraction({ ...body, chain: Currency.ONE })
  return await helperPrepareSCCall(body, 'cancelListing', params, provider)
}

/**
 * Update marketplace fee.
 * @param body request data
 * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
 * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
 */
export const sendMarketplaceUpdateFee = async (body: ChainUpdateMarketplaceFee, provider?: string) =>
  helperBroadcastTx(await prepareMarketplaceUpdateFee(body, provider), body.signatureId)
/**
 * Update marketplace fee recipient.
 * @param body request data
 * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
 * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
 */
export const sendMarketplaceUpdateFeeRecipient = async (body: ChainUpdateMarketplaceFeeRecipient, provider?: string) =>
  helperBroadcastTx(await prepareMarketplaceUpdateFeeRecipient(body, provider), body.signatureId)
/**
 * Approve ERC20 spending for marketplace to perform buy with ERC20 token.
 * @param testnet chain to work with
 * @param body request data
 * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
 * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
 */
export const sendMarketplaceApproveErc20Spending = async (testnet: boolean, body: ChainApproveErc20, provider?: string) =>
  helperBroadcastTx(await prepareMarketplaceApproveErc20Spending(testnet, body, provider), body.signatureId)
/**
 * Create new listing on the marketplace.
 * After listing is created, seller must send the asset to the marketplace smart contract.
 * Only listing for existing NFTs can be created - seller must be owner of the NFT asset.
 * @param body request data
 * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
 * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
 */
export const sendMarketplaceCreateListing = async (body: ChainCreateMarketplaceListing, provider?: string) =>
  helperBroadcastTx(await prepareMarketplaceCreateListing(body, provider), body.signatureId)
/**
 * Buy listing on the marketplace. Buyer must either send native assets with this operation, or approve ERC20 token spending before.
 * After listing is sold, it's in a pending state to be processed by the marketplace. Noone receives the assets unless the marketplace operator processes that.
 * @param body request data
 * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
 * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
 */
export const sendMarketplaceBuyListing = async (body: ChainInvokeMarketplaceListingOperation, provider?: string) =>
  helperBroadcastTx(await prepareMarketplaceBuyListing(body, provider), body.signatureId)
/**
 * Cancel listing on the marketplace. Only possible for the seller or the operator. There must be no buyer present for that listing. NFT asset is sent back to the seller.
 * @param body request data
 * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
 * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
 */
export const sendMarketplaceCancelListing = async (body: ChainInvokeMarketplaceListingOperation, provider?: string) =>
  helperBroadcastTx(await prepareMarketplaceCancelListing(body, provider), body.signatureId)

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/GetMarketplaceFee" target="_blank">Tatum API documentation</a>
 */
export const getMarketplaceFee = async (contractAddress: string) => {
  return getMarketplaceFeeDefi(Currency.ONE, contractAddress)
}

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/GetMarketplaceListing" target="_blank">Tatum API documentation</a>
 */
export const getMarketplaceListing = async (contractAddress: string, listingId: string) => {
  return getMarketplaceListingDefi(Currency.ONE, contractAddress, listingId)
}

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/GetMarketplaceFeeRecipient" target="_blank">Tatum API documentation</a>
 */
export const getMarketplaceFeeRecipient = async (contractAddress: string) => {
  return getMarketplaceFeeRecipientDefi(Currency.ONE, contractAddress)
}
