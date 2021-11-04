import {
  auction,
  erc1155TokenABI,
  erc721TokenABI,
  prepareAuctionApproveNftTransferAbstraction,
  prepareAuctionBidAbstraction,
  prepareAuctionCancelAbstraction,
  prepareAuctionCreateAbstraction,
  prepareAuctionSettleAbstraction,
  prepareAuctionUpdateFeeAbstraction,
  prepareAuctionUpdateFeeRecipientAbstraction,
} from '@tatumio/tatum-core'
import {
  ApproveErc20,
  ApproveNftTransfer,
  CreateAuction,
  DeployNftAuction,
  InvokeAuctionOperation,
  UpdateAuctionFee,
  UpdateMarketplaceFeeRecipient,
} from '@tatumio/tatum-core'
import { prepareEthDeployAuctionSignedTransaction } from '../../transaction'
import { helperBroadcastTx, helperGetWeb3Client, helperPrepareSCCall } from '../../helpers'
import { prepareApproveErc20 } from '../../fungible'

/**
 * Deploy new smart contract for NFT auction logic. Smart contract enables auction operator to create new auction for NFT (ERC-721/1155).
 * Operator can set a fee in percentage, which will be paid on top of the price of the asset.
 * can be offered for native asset - ETH, BSC, etc. - or any ERC20 token - this is configurable during auction creation.
 * Before auction is created, seller must approve transfer of the NFT to the auction contract.
 * Buyer will bid for the asset from the auction using native asset - send assets along the gid() smart contract call, or via ERC20 token.
 * Buyer of the auction must perform approval for the smart contract to access ERC20 token, before the actual bid() method is called.
 * Once there is higher bid than the actual one, the previous bidder's funds will be returned to him and new bidder will be the current winning one.
 * When auction ends, anyone can settle the auction - NFT will be sent to the bidder, assets to the seller and fee to the operator.
 * @param body request data
 * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
 * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
 */
export const deployAuction = async (body: DeployNftAuction, provider?: string) =>
  helperBroadcastTx(await prepareDeployAuction(body, provider), body.signatureId)

/**
 * Prepare signed transaction for NFT auction logic. Smart contract enables auction operator to create new auction for NFT (ERC-721/1155).
 * Operator can set a fee in percentage, which will be paid on top of the price of the asset.
 * can be offered for native asset - ETH, BSC, etc. - or any ERC20 token - this is configurable during auction creation.
 * Before auction is created, seller must approve transfer of the NFT to the auction contract.
 * Buyer will bid for the asset from the auction using native asset - send assets along the gid() smart contract call, or via ERC20 token.
 * Buyer of the auction must perform approval for the smart contract to access ERC20 token, before the actual bid() method is called.
 * Once there is higher bid than the actual one, the previous bidder's funds will be returned to him and new bidder will be the current winning one.
 * When auction ends, anyone can settle the auction - NFT will be sent to the bidder, assets to the seller and fee to the operator.
 * @param body request data
 * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
 * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
 */
export const prepareDeployAuction = async (body: DeployNftAuction, provider?: string) => {
  return await prepareEthDeployAuctionSignedTransaction(body, provider)
}

/**
 * Update auction fee.
 * @param body request data
 * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
 * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
 */
export const prepareAuctionUpdateFee = async (body: UpdateAuctionFee, provider?: string) => {
  const params = await prepareAuctionUpdateFeeAbstraction(body)
  return await helperPrepareSCCall(body, 'setAuctionFee', params, provider, auction.abi)
}

/**
 * Update auction fee recipient.
 * @param body request data
 * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
 * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
 */
export const prepareAuctionUpdateFeeRecipient = async (body: UpdateMarketplaceFeeRecipient, provider?: string) => {
  const params = await prepareAuctionUpdateFeeRecipientAbstraction(body)
  return await helperPrepareSCCall(
    body,
    'setAuctionFeeRecipient',
    params,
    provider,
    auction.abi
  )
}

/**
 * Approve NFT transfer for auction to perform listing of the asset.
 * @param body request data
 * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
 * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
 */
export const prepareAuctionApproveNftTransfer = async (body: ApproveNftTransfer, provider?: string) => {
  const params = await prepareAuctionApproveNftTransferAbstraction(body)
  return await helperPrepareSCCall(
    body,
    body.isErc721 ? 'approve' : 'setApprovalForAll',
    params,
    provider,
    body.isErc721 ? erc721TokenABI : erc1155TokenABI
  )
}

/**
 * Approve ERC20 transfer for auction to perform bidding on the asset in the auction.
 * @param testnet chain to work with
 * @param body request data
 * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
 * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
 */
export const prepareAuctionApproveErc20Transfer = async (testnet: boolean, body: ApproveErc20, provider?: string) => {
  return prepareApproveErc20(testnet, body, provider)
}

/**
 * Create new auction on the auction contract. Before auction, seller must approve spending of the NFT token for the Auction contract.
 * After auction is created, auction contract transfers the asset to the auction smart contract.
 * Only auction for existing NFTs can be created - seller must be owner of the NFT asset.
 * @param body request data
 * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
 * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
 */
export const prepareAuctionCreate = async (body: CreateAuction, provider?: string) => {
  const { body: validatedBody, params } = await prepareAuctionCreateAbstraction(body)
  return await helperPrepareSCCall(validatedBody, 'createAuction', params, provider, auction.abi)
}

/**
 * Bid on the auction. Buyer must either send native assets with this operation, or approve ERC20 token spending before.
 * After auction is sold, it's in a pending state to be processed by the auction. Noone receives the assets unless the auction operator processes that.
 * @param testnet chain to work with
 * @param body request data
 * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
 * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
 */
export const prepareAuctionBid = async (testnet: boolean, body: InvokeAuctionOperation, provider?: string) => {
  const { b: validatedBody, params } = await prepareAuctionBidAbstraction((_testnet, _chain, provider?) => helperGetWeb3Client(provider), testnet, body, provider)
  return await helperPrepareSCCall(validatedBody, 'bid', params, provider, auction.abi)
}

/**
 * Cancel auction on the auction. Only possible for the seller or the operator. There must be no buyer present for that auction. NFT asset is sent back to the seller.
 * @param body request data
 * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
 * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
 */
export const prepareAuctionCancel = async (body: InvokeAuctionOperation, provider?: string) => {
  const params = await prepareAuctionCancelAbstraction(body)
  return await helperPrepareSCCall(body, 'cancelAuction', params, provider, auction.abi)
}

/**
 * Settle auction. There must be buyer present for that auction. NFT will be sent to the bidder, assets to the seller and fee to the operator.
 * @param testnet chain to work with
 * @param body request data
 * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
 * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
 */
export const prepareAuctionSettle = async (testnet: boolean, body: InvokeAuctionOperation, provider?: string) => {
  const params = await prepareAuctionSettleAbstraction(testnet, body)
  return await helperPrepareSCCall(body, 'settleAuction', params, provider, auction.abi)
}

/**
 * Update auction fee.
 * @param body request data
 * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
 * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
 */
export const sendAuctionUpdateFee = async (body: UpdateAuctionFee, provider?: string) =>
  helperBroadcastTx(await prepareAuctionUpdateFee(body, provider), body.signatureId)
/**
 * Update auction fee recipient.
 * @param body request data
 * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
 * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
 */
export const sendAuctionUpdateFeeRecipient = async (body: UpdateMarketplaceFeeRecipient, provider?: string) =>
  helperBroadcastTx(await prepareAuctionUpdateFeeRecipient(body, provider), body.signatureId)
/**
 * Approve NFT transfer for auction to perform listing of the asset.
 * @param body request data
 * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
 * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
 */
export const sendAuctionApproveNftTransfer = async (body: ApproveNftTransfer, provider?: string) =>
  helperBroadcastTx(await prepareAuctionApproveNftTransfer(body, provider), body.signatureId)
/**
 * Approve ERC20 transfer for auction to perform bidding on the asset in the auction.
 * @param testnet chain to work with
 * @param body request data
 * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
 * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
 */
export const sendAuctionApproveErc20Transfer = async (testnet: boolean, body: ApproveErc20, provider?: string) =>
  helperBroadcastTx(await prepareAuctionApproveErc20Transfer(testnet, body, provider), body.signatureId)
/**
 * Create new auction on the auction contract. Before auction, seller must approve spending of the NFT token for the Auction contract.
 * After auction is created, auction contract transfers the asset to the auction smart contract.
 * Only auction for existing NFTs can be created - seller must be owner of the NFT asset.
 * @param body request data
 * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
 * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
 */
export const sendAuctionCreate = async (body: CreateAuction, provider?: string) =>
  helperBroadcastTx(await prepareAuctionCreate(body, provider), body.signatureId)
/**
 * Bid auction on the auction. Buyer must either send native assets with this operation, or approve ERC20 token spending before.
 * After auction is sold, it's in a pending state to be processed by the auction. Noone receives the assets unless the auction operator processes that.
 * @param testnet chain to work with
 * @param body request data
 * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
 * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
 */
export const sendAuctionBid = async (testnet: boolean, body: InvokeAuctionOperation, provider?: string) =>
  helperBroadcastTx(await prepareAuctionBid(testnet, body, provider), body.signatureId)
/**
 * Cancel auction on the auction. Only possible for the seller or the operator. There must be no buyer present for that auction. NFT asset is sent back to the seller.
 * @param body request data
 * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
 * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
 */
export const sendAuctionCancel = async (body: InvokeAuctionOperation, provider?: string) =>
  helperBroadcastTx(await prepareAuctionCancel(body, provider), body.signatureId)

/**
 * Settle auction. There must be buyer present for that auction. NFT will be sent to the bidder, assets to the seller and fee to the operator.
 * @param testnet chain to work with
 * @param body request data
 * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
 * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
 */
export const sendAuctionSettle = async (testnet: boolean, body: InvokeAuctionOperation, provider?: string) =>
  helperBroadcastTx(await prepareAuctionSettle(testnet, body, provider), body.signatureId)

export { Auction, getAuctionFee, getAuction, getAuctionFeeRecipient } from '@tatumio/tatum-core'
