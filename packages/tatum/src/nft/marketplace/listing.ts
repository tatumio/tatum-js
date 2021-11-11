import {
  ApproveErc20,
  Currency,
  CreateMarketplaceListing,
  DeployMarketplaceListing,
  InvokeMarketplaceListingOperation,
  UpdateMarketplaceFee,
  UpdateMarketplaceFeeRecipient,
} from '@tatumio/tatum-core'
import {
  prepareMarketplaceCancelListingAbstraction,
  prepareMarketplaceBuyListingAbstraction,
  prepareMarketplaceCreateListingAbstraction,
  prepareMarketplaceUpdateFeeAbstraction,
  prepareMarketplaceUpdateFeeRecipientAbstraction,
} from '@tatumio/tatum-defi'
import { helperBroadcastTx, helperPrepareSCCall } from '../../helpers'
import { prepareApproveErc20 } from '../../fungible'
import {
  deployMarketplaceListing as sendCeloDeployMarketplaceListingSignedTransaction,
  prepareDeployMarketplaceListing as prepareCeloDeployMarketplaceListingSignedTransaction,
} from '@tatumio/tatum-celo/src'
import {
  deployMarketplaceListing as sendOneDeployMarketplaceListingSignedTransaction,
  prepareDeployMarketplaceListing as prepareOneDeployMarketplaceListingSignedTransaction,
} from '@tatumio/tatum-one/src'
import {
  deployMarketplaceListing as sendEthDeployMarketplaceListingSignedTransaction,
  prepareDeployMarketplaceListing as prepareEthDeployMarketplaceListingSignedTransaction,
} from '@tatumio/tatum-eth/src'
import {
  deployMarketplaceListing as sendBscDeployMarketplaceListingSignedTransaction,
  prepareDeployMarketplaceListing as prepareBscDeployMarketplaceListingSignedTransaction,
} from '@tatumio/tatum-bsc/src'
import {
  deployMarketplaceListing as sendPolygonDeployMarketplaceListingSignedTransaction,
  prepareDeployMarketplaceListing as preparePolygonDeployMarketplaceListingSignedTransaction,
} from '@tatumio/tatum-polygon'
import {
  DeployTronMarketplaceListing,
  UpdateTronMarketplaceFee,
  UpdateTronMarketplaceFeeRecipient,
  CreateTronMarketplaceListing,
} from '@tatumio/tatum-tron'

/**
 * Deploy new smart contract for NFT marketplace logic. Smart contract enables marketplace operator to create new listing for NFT (ERC-721/1155).
 * Operator can set a fee in percentage, which will be paid on top of the price of the asset.
 * Listing can be offered for native asset - ETH, BSC, etc. - or any ERC20 token - this is configurable during listing creation.
 * Once the listing is created, seller must send the NFT asset to the smart contract.
 * Buyer will buy the asset from the listing using native asset - send assets along the buyAssetFromListing() smart contract call, or via ERC20 token.
 * Buyer of the listing must perform approval for the smart contract to access ERC20 token, before the actual buyAssetFromListing() method is called.
 * Once both assets - from buyer and seller - are in the smart contract, NFT is sent to the buyer, price is sent to the seller
 * and marketplace fee is set to the operator.
 * @param testnet chain to work with
 * @param body request data
 * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
 * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
 */
export const deployMarketplaceListing = async (
  testnet: boolean,
  body: DeployMarketplaceListing | DeployTronMarketplaceListing,
  provider?: string
) => {
  switch (body.chain) {
    case Currency.CELO:
      return await sendCeloDeployMarketplaceListingSignedTransaction(testnet, body, provider)
    case Currency.ONE:
      return await sendOneDeployMarketplaceListingSignedTransaction(testnet, body, provider)
    case Currency.ETH:
      return await sendEthDeployMarketplaceListingSignedTransaction(body, provider)
    case Currency.BSC:
      return await sendBscDeployMarketplaceListingSignedTransaction(testnet, body, provider)
    case Currency.MATIC:
      return await sendPolygonDeployMarketplaceListingSignedTransaction(testnet, body, provider)
    // case Currency.TRON:
    //     return await sendTronDeployMarketplaceListingSignedTransaction(testnet, body as DeployTronMarketplaceListing, provider)
    default:
      throw new Error('Unsupported chain')
  }
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
 * @param testnet chain to work with
 * @param body request data
 * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
 * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
 */
export const prepareDeployMarketplaceListing = async (
  testnet: boolean,
  body: DeployMarketplaceListing | DeployTronMarketplaceListing,
  provider?: string
) => {
  switch (body.chain) {
    case Currency.CELO:
      return await prepareCeloDeployMarketplaceListingSignedTransaction(testnet, body, provider)
    case Currency.ONE:
      return await prepareOneDeployMarketplaceListingSignedTransaction(testnet, body, provider)
    case Currency.ETH:
      return await prepareEthDeployMarketplaceListingSignedTransaction(body, provider)
    case Currency.BSC:
      return await prepareBscDeployMarketplaceListingSignedTransaction(testnet, body, provider)
    case Currency.MATIC:
      return await preparePolygonDeployMarketplaceListingSignedTransaction(testnet, body, provider)
    // case Currency.TRON:
    //     return await prepareTronDeployMarketplaceListingSignedTransaction(testnet, body as DeployTronMarketplaceListing, provider)
    default:
      throw new Error('Unsupported chain')
  }
}

/**
 * Update marketplace fee.
 * @param testnet chain to work with
 * @param body request data
 * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
 * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
 */
export const prepareMarketplaceUpdateFee = async (
  testnet: boolean,
  body: UpdateMarketplaceFee | UpdateTronMarketplaceFee,
  provider?: string
) => {
  if (body.chain === Currency.TRON) {
    throw new Error('Unsupported chain')
  }

  const params = await prepareMarketplaceUpdateFeeAbstraction(body)
  return await helperPrepareSCCall(testnet, body, UpdateMarketplaceFee, 'setMarketplaceFee', params, undefined, provider)
}

/**
 * Update marketplace fee recipient.
 * @param testnet chain to work with
 * @param body request data
 * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
 * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
 */
export const prepareMarketplaceUpdateFeeRecipient = async (
  testnet: boolean,
  body: UpdateMarketplaceFeeRecipient | UpdateTronMarketplaceFeeRecipient,
  provider?: string
) => {
  if (body.chain === Currency.TRON) {
    throw new Error('Unsupported chain')
  }

  const params = await prepareMarketplaceUpdateFeeRecipientAbstraction(body)
  return await helperPrepareSCCall(testnet, body, UpdateMarketplaceFeeRecipient, 'setMarketplaceFeeRecipient', params, undefined, provider)
}

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
 * @param testnet chain to work with
 * @param body request data
 * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
 * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
 */
export const prepareMarketplaceCreateListing = async (
  testnet: boolean,
  body: CreateMarketplaceListing | CreateTronMarketplaceListing,
  provider?: string
) => {
  if (body.chain === Currency.TRON) {
    throw new Error('Unsupported chain')
  }

  const { body: validatedBody, params } = await prepareMarketplaceCreateListingAbstraction(body)
  return await helperPrepareSCCall(testnet, validatedBody, CreateMarketplaceListing, 'createListing', params, undefined, provider)
}

/**
 * Buy listing on the marketplace. Buyer must either send native assets with this operation, or approve ERC20 token spending before.
 * After listing is sold, it's in a pending state to be processed by the marketplace. Noone receives the assets unless the marketplace operator processes that.
 * @param testnet chain to work with
 * @param body request data
 * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
 * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
 */
export const prepareMarketplaceBuyListing = async (
  testnet: boolean,
  body: InvokeMarketplaceListingOperation | InvokeTronMarketplaceListingOperation,
  provider?: string
) => {
  if (body.chain === Currency.TRON) {
    throw new Error('Unsupported chain')
  }

  const { body: validatedBody, params } = await prepareMarketplaceBuyListingAbstraction(body)
  return await helperPrepareSCCall(testnet, body, InvokeMarketplaceListingOperation, 'buyAssetFromListing', params, undefined, provider)
}

/**
 * Cancel listing on the marketplace. Only possible for the seller or the operator. There must be no buyer present for that listing. NFT asset is sent back to the seller.
 * @param testnet chain to work with
 * @param body request data
 * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
 * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
 */
export const prepareMarketplaceCancelListing = async (
  testnet: boolean,
  body: InvokeMarketplaceListingOperation | InvokeTronMarketplaceListingOperation,
  provider?: string
) => {
  if (body.chain === Currency.TRON) {
    throw new Error('Unsupported chain')
  }
  const params = await prepareMarketplaceCancelListingAbstraction(body)
  return await helperPrepareSCCall(testnet, body, InvokeMarketplaceListingOperation, 'cancelListing', params, undefined, provider)
}

/**
 * Update marketplace fee.
 * @param testnet chain to work with
 * @param body request data
 * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
 * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
 */
export const sendMarketplaceUpdateFee = async (
  testnet: boolean,
  body: UpdateMarketplaceFee | UpdateTronMarketplaceFee,
  provider?: string
) => helperBroadcastTx(body.chain, await prepareMarketplaceUpdateFee(testnet, body, provider), body.signatureId)

/**
 * Update marketplace fee recipient.
 * @param testnet chain to work with
 * @param body request data
 * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
 * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
 */
export const sendMarketplaceUpdateFeeRecipient = async (
  testnet: boolean,
  body: UpdateMarketplaceFeeRecipient | UpdateTronMarketplaceFeeRecipient,
  provider?: string
) => helperBroadcastTx(body.chain, await prepareMarketplaceUpdateFeeRecipient(testnet, body, provider), body.signatureId)

/**
 * Approve ERC20 spending for marketplace to perform buy with ERC20 token.
 * @param testnet chain to work with
 * @param body request data
 * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
 * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
 */
export const sendMarketplaceApproveErc20Spending = async (testnet: boolean, body: ApproveErc20, provider?: string) =>
  helperBroadcastTx(body.chain, await prepareMarketplaceApproveErc20Spending(testnet, body, provider), body.signatureId)

/**
 * Create new listing on the marketplace.
 * After listing is created, seller must send the asset to the marketplace smart contract.
 * Only listing for existing NFTs can be created - seller must be owner of the NFT asset.
 * @param testnet chain to work with
 * @param body request data
 * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
 * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
 */
export const sendMarketplaceCreateListing = async (
  testnet: boolean,
  body: CreateMarketplaceListing | CreateTronMarketplaceListing,
  provider?: string
) => helperBroadcastTx(body.chain, await prepareMarketplaceCreateListing(testnet, body, provider), body.signatureId)

/**
 * Buy listing on the marketplace. Buyer must either send native assets with this operation, or approve ERC20 token spending before.
 * After listing is sold, it's in a pending state to be processed by the marketplace. Noone receives the assets unless the marketplace operator processes that.
 * @param testnet chain to work with
 * @param body request data
 * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
 * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
 */
export const sendMarketplaceBuyListing = async (
  testnet: boolean,
  body: InvokeMarketplaceListingOperation | InvokeTronMarketplaceListingOperation,
  provider?: string
) => helperBroadcastTx(body.chain, await prepareMarketplaceBuyListing(testnet, body, provider), body.signatureId)

/**
 * Cancel listing on the marketplace. Only possible for the seller or the operator. There must be no buyer present for that listing. NFT asset is sent back to the seller.
 * @param testnet chain to work with
 * @param body request data
 * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
 * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
 */
export const sendMarketplaceCancelListing = async (
  testnet: boolean,
  body: InvokeMarketplaceListingOperation | InvokeTronMarketplaceListingOperation,
  provider?: string
) => helperBroadcastTx(body.chain, await prepareMarketplaceCancelListing(testnet, body, provider), body.signatureId)

export { getMarketplaceFee, getMarketplaceListing, getMarketplaceFeeRecipient } from '@tatumio/tatum-defi'
