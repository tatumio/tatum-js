import {
  prepareMarketplaceCancelListingAbstraction,
  prepareMarketplaceBuyListingAbstraction,
  prepareMarketplaceCreateListingAbstraction,
  prepareMarketplaceUpdateFeeAbstraction,
  prepareMarketplaceUpdateFeeRecipientAbstraction,
  ApproveErc20,
} from '@tatumio/tatum-core'
import {
  CreateMarketplaceListing,
  DeployMarketplaceListing,
  InvokeMarketplaceListingOperation,
  UpdateMarketplaceFee,
  UpdateMarketplaceFeeRecipient,
} from '@tatumio/tatum-core'
import { prepareEthDeployMarketplaceListingSignedTransaction, sendEthDeployMarketplaceListingSignedTransaction } from '../../transaction'
import { helperBroadcastTx, helperPrepareSCCall } from 'src/helpers'
import { prepareApproveErc20 } from '../../fungible'

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
export const deployMarketplaceListing = async (body: DeployMarketplaceListing, provider?: string) => {
  return await sendEthDeployMarketplaceListingSignedTransaction(body, provider)
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
export const prepareDeployMarketplaceListing = async (body: DeployMarketplaceListing, provider?: string) => {
  return await prepareEthDeployMarketplaceListingSignedTransaction(body, provider)
}

/**
 * Update marketplace fee.
 * @param body request data
 * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
 * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
 */
export const prepareMarketplaceUpdateFee = async (body: UpdateMarketplaceFee, provider?: string) => {
  const params = await prepareMarketplaceUpdateFeeAbstraction(body)
  return await helperPrepareSCCall(body, 'setMarketplaceFee', params, provider)
}

/**
 * Update marketplace fee recipient.
 * @param body request data
 * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
 * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
 */
export const prepareMarketplaceUpdateFeeRecipient = async (body: UpdateMarketplaceFeeRecipient, provider?: string) => {
  const params = await prepareMarketplaceUpdateFeeRecipientAbstraction(body)
  return await helperPrepareSCCall(body, 'setMarketplaceFeeRecipient', params, provider)
}

/**
 * Create new listing on the marketplace.
 * After listing is created, seller must send the asset to the marketplace smart contract.
 * Only listing for existing NFTs can be created - seller must be owner of the NFT asset.
 * @param body request data
 * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
 * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
 */
export const prepareMarketplaceCreateListing = async (body: CreateMarketplaceListing, provider?: string) => {
  const { body: validatedBody, params } = await prepareMarketplaceCreateListingAbstraction(body)
  return await helperPrepareSCCall(validatedBody, 'createListing', params, provider)
}

/**
 * Buy listing on the marketplace. Buyer must either send native assets with this operation, or approve ERC20 token spending before.
 * After listing is sold, it's in a pending state to be processed by the marketplace. Noone receives the assets unless the marketplace operator processes that.
 * @param body request data
 * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
 * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
 */
export const prepareMarketplaceBuyListing = async (body: InvokeMarketplaceListingOperation, provider?: string) => {
  const { body: validatedBody, params } = await prepareMarketplaceBuyListingAbstraction(body)
  return await helperPrepareSCCall(
    validatedBody,
    'buyAssetFromListing',
    params,
    provider
  )
}

/**
 * Cancel listing on the marketplace. Only possible for the seller or the operator. There must be no buyer present for that listing. NFT asset is sent back to the seller.
 * @param body request data
 * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
 * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
 */
export const prepareMarketplaceCancelListing = async (body: InvokeMarketplaceListingOperation, provider?: string) => {
  const params = await prepareMarketplaceCancelListingAbstraction(body)
  return await helperPrepareSCCall(body, 'cancelListing', params, provider)
}

/**
 * Update marketplace fee.
 * @param body request data
 * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
 * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
 */
export const sendMarketplaceUpdateFee = async (body: UpdateMarketplaceFee, provider?: string) =>
  helperBroadcastTx(await prepareMarketplaceUpdateFee(body, provider), body.signatureId)

/**
 * Update marketplace fee recipient.
 * @param body request data
 * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
 * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
 */
export const sendMarketplaceUpdateFeeRecipient = async (body: UpdateMarketplaceFeeRecipient, provider?: string) =>
  helperBroadcastTx(await prepareMarketplaceUpdateFeeRecipient(body, provider), body.signatureId)

/**
 * Approve ERC20 spending for marketplace to perform buy with ERC20 token.
 * @param testnet chain to work with
 * @param body request data
 * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
 * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
 */
export const prepareMarketplaceApproveErc20Spending = async (testnet: boolean, body: ApproveErc20, provider?: string) => {
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
export const sendMarketplaceCreateListing = async (body: CreateMarketplaceListing, provider?: string) =>
  helperBroadcastTx(await prepareMarketplaceCreateListing(body, provider), body.signatureId)

/**
 * Buy listing on the marketplace. Buyer must either send native assets with this operation, or approve ERC20 token spending before.
 * After listing is sold, it's in a pending state to be processed by the marketplace. Noone receives the assets unless the marketplace operator processes that.
 * @param body request data
 * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
 * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
 */
export const sendMarketplaceBuyListing = async (body: InvokeMarketplaceListingOperation, provider?: string) =>
  helperBroadcastTx(await prepareMarketplaceBuyListing(body, provider), body.signatureId)

/**
 * Cancel listing on the marketplace. Only possible for the seller or the operator. There must be no buyer present for that listing. NFT asset is sent back to the seller.
 * @param body request data
 * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
 * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
 */
export const sendMarketplaceCancelListing = async (body: InvokeMarketplaceListingOperation, provider?: string) =>
  helperBroadcastTx(await prepareMarketplaceCancelListing(body, provider), body.signatureId)

/**
 * Approve ERC20 spending for marketplace to perform buy with ERC20 token.
 * @param testnet chain to work with
 * @param body request data
 * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
 * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
 */
export const sendMarketplaceApproveErc20Spending = async (testnet: boolean, body: ApproveErc20, provider?: string) =>
  helperBroadcastTx(await prepareMarketplaceApproveErc20Spending(testnet, body, provider), body.signatureId)

export { getMarketplaceFee, getMarketplaceListing, getMarketplaceFeeRecipient } from '@tatumio/tatum-core'
