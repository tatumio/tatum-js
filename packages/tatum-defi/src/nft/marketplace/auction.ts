import BigNumber from 'bignumber.js'
import {
  auction,
  get,
  validateBody,
  ApproveNftTransfer,
  CreateAuction,
  Currency,
  InvokeAuctionOperation,
  UpdateAuctionFee,
  UpdateMarketplaceFeeRecipient,
} from '@tatumio/tatum-core'
import Web3 from 'web3'

export interface Auction {
  /*
     address of the seller
     */
  seller: string
  /*
     address of the token to sale
     */
  nftAddress: string
  /*
     ID of the NFT
     */
  tokenId: string
  /*
     if the auction is for ERC721 - true - or ERC1155 - false
     */
  isErc721: boolean
  /*
     Block height of end of auction
     */
  endedAt: string
  /*
     Block height, in which the auction started.
     */
  startedAt: string
  /*
     optional - if the auction is settled in the ERC20 token or in native currency
     */
  erc20Address?: string
  /*
     for ERC-1155 - how many tokens are for sale
     */
  amount: string
  /*
     Ending price of the asset at the end of the auction
     */
  endingPrice: string
  /*
     Actual highest bidder
     */
  bidder?: string
}

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/MPAuctionFee" target="_blank">Tatum API documentation</a>
 */
export const getAuctionFee = async (chain: Currency, contractAddress: string): Promise<number> =>
  get(`/v3/blockchain/auction/auction/${chain}/${contractAddress}/fee`)

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/MPAuction" target="_blank">Tatum API documentation</a>
 */
export const getAuction = async (chain: Currency, contractAddress: string, auctionId: string): Promise<Auction> =>
  get(`/v3/blockchain/auction/auction/${chain}/${contractAddress}/auction/${auctionId}`)

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/MPAuctionRecipient" target="_blank">Tatum API documentation</a>
 */
export const getAuctionFeeRecipient = async (chain: Currency, contractAddress: string): Promise<{ address: string }> =>
  get(`/v3/blockchain/auction/auction/${chain}/${contractAddress}/recipient`)

/**
 * Update auction fee.
 * @param testnet chain to work with
 * @param body request data
 * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
 * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
 */
export const prepareAuctionUpdateFeeAbstraction = async (body: UpdateAuctionFee) => {
  await validateBody(body, UpdateAuctionFee)
  return [`0x${new BigNumber(body.auctionFee).toString(16)}`]
}

/**
 * Update auction fee recipient.
 * @param testnet chain to work with
 * @param body request data
 * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
 * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
 */
export const prepareAuctionUpdateFeeRecipientAbstraction = async (body: UpdateMarketplaceFeeRecipient) => {
  await validateBody(body, UpdateMarketplaceFeeRecipient)
  return [body.feeRecipient]
}

/**
 * Approve NFT transfer for auction to perform listing of the asset.
 * @param testnet chain to work with
 * @param body request data
 * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
 * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
 */
export const prepareAuctionApproveNftTransferAbstraction = async (body: ApproveNftTransfer) => {
  await validateBody(body, ApproveNftTransfer)
  return body.isErc721 ? [body.spender, `0x${new BigNumber(body.tokenId).toString(16)}`] : [body.spender, true]
}

/**
 * Create new auction on the auction contract. Before auction, seller must approve spending of the NFT token for the Auction contract.
 * After auction is created, auction contract transfers the asset to the auction smart contract.
 * Only auction for existing NFTs can be created - seller must be owner of the NFT asset.
 * @param testnet chain to work with
 * @param body request data
 * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
 * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
 */
export const prepareAuctionCreateAbstraction = async (body: CreateAuction) => {
  await validateBody(body, CreateAuction)
  const params = [
    body.id,
    body.isErc721,
    body.nftAddress.trim(),
    `0x${new BigNumber(body.tokenId).toString(16)}`,
    body.seller.trim(),
    `0x${new BigNumber(body.amount || 0).toString(16)}`,
    `0x${new BigNumber(body.endedAt).toString(16)}`,
    body.erc20Address || '0x0000000000000000000000000000000000000000',
  ]
  body.amount = undefined
  return { body, params }
}

/**
 * Bid on the auction. Buyer must either send native assets with this operation, or approve ERC20 token spending before.
 * After auction is sold, it's in a pending state to be processed by the auction. Noone receives the assets unless the auction operator processes that.
 * @param testnet chain to work with
 * @param body request data
 * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
 * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
 */
export const prepareAuctionBidAbstraction = async (
  helperGetWeb3Client: (testnet: boolean, chain: Currency, provider?: string | undefined) => Web3,
  testnet: boolean,
  body: InvokeAuctionOperation,
  provider?: string
) => {
  await validateBody(body, InvokeAuctionOperation)

  const web3 = helperGetWeb3Client(testnet, body.chain, provider)
  // @ts-ignore
  const a = await new web3.eth.Contract(auction.abi, body.contractAddress).methods.getAuction(body.id).call()
  let decimals = 18
  const b: any = { ...body }
  if (a[6] !== '0x0000000000000000000000000000000000000000') {
    // @ts-ignore
    decimals = await getErc20Decimals(testnet, body.chain, a[6], provider)
  } else {
    b.amount = body.bidValue
  }

  const params = [body.id, `0x${new BigNumber(body.bidValue).multipliedBy(new BigNumber(10).pow(decimals)).toString(16)}`]
  return { b, params }
}

/**
 * Cancel auction on the auction. Only possible for the seller or the operator. There must be no buyer present for that auction. NFT asset is sent back to the seller.
 * @param testnet chain to work with
 * @param body request data
 * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
 * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
 */
export const prepareAuctionCancelAbstraction = async (body: InvokeAuctionOperation) => {
  await validateBody(body, InvokeAuctionOperation)
  return [body.id]
}

/**
 * Settle auction. There must be buyer present for that auction. NFT will be sent to the bidder, assets to the seller and fee to the operator.
 * @param testnet chain to work with
 * @param body request data
 * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
 * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
 */
export const prepareAuctionSettleAbstraction = async (testnet: boolean, body: InvokeAuctionOperation) => {
  await validateBody(body, InvokeAuctionOperation)
  return [body.id]
}
