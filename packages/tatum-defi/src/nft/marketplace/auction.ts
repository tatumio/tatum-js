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
  DeployNftAuction,
  erc721TokenABI,
  erc1155TokenABI,
  ApproveErc20,
} from '@tatumio/tatum-core'
import Web3 from 'web3'
import { prepareDeployAuction as prepareCeloDeployAuctionSignedTransaction } from '@tatumio/tatum-celo'
import { prepareDeployAuction as prepareOneDeployAuctionSignedTransaction } from '@tatumio/tatum-one'
import { prepareDeployAuction as prepareEthDeployAuctionSignedTransaction } from '@tatumio/tatum-eth'
import { prepareDeployAuction as prepareBscDeployAuctionSignedTransaction } from '@tatumio/tatum-bsc'
import { prepareDeployAuction as preparePolygonDeployAuctionSignedTransaction } from '@tatumio/tatum-polygon'
import { getErc20Decimals, prepareApproveErc20 } from '@tatumio/tatum'
import { helperBroadcastTx, helperGetWeb3Client, helperPrepareSCCall } from '../../helpers'

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
  /*
   Actual highest bid
   */
  highestBid?: string
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
export const prepareAuctionUpdateFeeAbstraction = async (body: UpdateAuctionFee): Promise<string[]> => {
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
  helperGetWeb3Client: (chain: Currency, provider?: string | undefined) => Web3,
  getErc20Decimals: (chain: Currency, contractAddress: string, provider?: string, testnet?: boolean) => Promise<any>,
  testnet: boolean,
  body: InvokeAuctionOperation,
  provider?: string
) => {
  await validateBody(body, InvokeAuctionOperation)

  const web3 = helperGetWeb3Client(body.chain, provider)
  // @ts-ignore
  const a = await new web3.eth.Contract(auction.abi, body.contractAddress).methods.getAuction(body.id).call()
  let decimals = 18
  let methodName = 'bid'
  const b: any = { ...body }
  if (a[6] !== '0x0000000000000000000000000000000000000000') {
    // @ts-ignore
    decimals = await getErc20Decimals(body.chain, a[6], provider, testnet)
    if (body.bidder) {
      methodName = 'bidForExternalBidder'
    }
  } else if (body.bidder) {
    throw new Error('Bidder could be present only for ERC20 based auctions.')
  } else {
    b.amount = body.bidValue
  }

  const params = [body.id, `0x${new BigNumber(body.bidValue).multipliedBy(new BigNumber(10).pow(decimals)).toString(16)}`]
  if (body.bidder) {
    params.push(body.bidder.trim())
  }
  return { b, params, methodName }
}

/**
 * Cancel auction on the auction. Only possible for the seller or the operator. There must be no buyer present for that auction. NFT asset is sent back to the seller.
 * @param body request data
 * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
 */
export const prepareAuctionCancelAbstraction = async (body: InvokeAuctionOperation): Promise<string[]> => {
  await validateBody(body, InvokeAuctionOperation)
  return [body.id]
}

/**
 * Settle auction. There must be buyer present for that auction. NFT will be sent to the bidder, assets to the seller and fee to the operator.
 * @param body request data
 * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
 */
export const prepareAuctionSettleAbstraction = async (body: InvokeAuctionOperation): Promise<string[]> => {
  await validateBody(body, InvokeAuctionOperation)
  return [body.id]
}

/**
 * Deploy new smart contract for NFT auction logic. Smart contract enables auction operator to create new auction for NFT (ERC-721/1155).
 * Operator can set a fee in percentage, which will be paid on top of the price of the asset.
 * can be offered for native asset - ETH, BSC, etc. - or any ERC20 token - this is configurable during auction creation.
 * Before auction is created, seller must approve transfer of the NFT to the auction contract.
 * Buyer will bid for the asset from the auction using native asset - send assets along the gid() smart contract call, or via ERC20 token.
 * Buyer of the auction must perform approval for the smart contract to access ERC20 token, before the actual bid() method is called.
 * Once there is higher bid than the actual one, the previous bidder's funds will be returned to him and new bidder will be the current winning one.
 * When auction ends, anyone can settle the auction - NFT will be sent to the bidder, assets to the seller and fee to the operator.
 * @param testnet chain to work with
 * @param body request data
 * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
 * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
 */
export const deployAuction = async (testnet: boolean, body: DeployNftAuction, provider?: string) =>
  helperBroadcastTx(body.chain, await prepareDeployAuction(testnet, body, provider), body.signatureId)

/**
 * Prepare signed transaction for NFT auction logic. Smart contract enables auction operator to create new auction for NFT (ERC-721/1155).
 * Operator can set a fee in percentage, which will be paid on top of the price of the asset.
 * can be offered for native asset - ETH, BSC, etc. - or any ERC20 token - this is configurable during auction creation.
 * Before auction is created, seller must approve transfer of the NFT to the auction contract.
 * Buyer will bid for the asset from the auction using native asset - send assets along the gid() smart contract call, or via ERC20 token.
 * Buyer of the auction must perform approval for the smart contract to access ERC20 token, before the actual bid() method is called.
 * Once there is higher bid than the actual one, the previous bidder's funds will be returned to him and new bidder will be the current winning one.
 * When auction ends, anyone can settle the auction - NFT will be sent to the bidder, assets to the seller and fee to the operator.
 * @param testnet chain to work with
 * @param body request data
 * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
 * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
 */
export const prepareDeployAuction = async (testnet: boolean, body: DeployNftAuction, provider?: string) => {
  switch (body.chain) {
    case Currency.CELO:
      return await prepareCeloDeployAuctionSignedTransaction(testnet, body, provider)
    case Currency.ONE:
      return await prepareOneDeployAuctionSignedTransaction(body, provider)
    case Currency.ETH:
      return await prepareEthDeployAuctionSignedTransaction(body, provider)
    case Currency.BSC:
      return await prepareBscDeployAuctionSignedTransaction(body, provider)
    case Currency.MATIC:
      return await preparePolygonDeployAuctionSignedTransaction(body, provider)
    default:
      throw new Error('Unsupported chain')
  }
}

/**
 * Update auction fee.
 * @param testnet chain to work with
 * @param body request data
 * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
 * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
 */
export const prepareAuctionUpdateFee = async (testnet: boolean, body: UpdateAuctionFee, provider?: string) => {
  const params = await prepareAuctionUpdateFeeAbstraction(body)
  return await helperPrepareSCCall(testnet, body, 'setAuctionFee', params, undefined, provider, auction.abi)
}

/**
 * Update auction fee recipient.
 * @param testnet chain to work with
 * @param body request data
 * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
 * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
 */
export const prepareAuctionUpdateFeeRecipient = async (testnet: boolean, body: UpdateMarketplaceFeeRecipient, provider?: string) => {
  const params = await prepareAuctionUpdateFeeRecipientAbstraction(body)
  return await helperPrepareSCCall(testnet, body, 'setAuctionFeeRecipient', params, undefined, provider, auction.abi)
}

/**
 * Approve NFT transfer for auction to perform listing of the asset.
 * @param testnet chain to work with
 * @param body request data
 * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
 * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
 */
export const prepareAuctionApproveNftTransfer = async (testnet: boolean, body: ApproveNftTransfer, provider?: string) => {
  const params = await prepareAuctionApproveNftTransferAbstraction(body)
  return await helperPrepareSCCall(
    testnet,
    body,
    body.isErc721 ? 'approve' : 'setApprovalForAll',
    params,
    undefined,
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
 * @param testnet chain to work with
 * @param body request data
 * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
 * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
 */
export const prepareAuctionCreate = async (testnet: boolean, body: CreateAuction, provider?: string) => {
  const { body: validatedBody, params } = await prepareAuctionCreateAbstraction(body)
  return await helperPrepareSCCall(testnet, validatedBody, 'createAuction', params, undefined, provider, auction.abi)
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
  const {
    b: validatedBody,
    params,
    methodName,
  } = await prepareAuctionBidAbstraction(helperGetWeb3Client, getErc20Decimals, testnet, body, provider)
  return await helperPrepareSCCall(testnet, validatedBody, methodName, params, undefined, provider, auction.abi)
}

/**
 * Cancel auction on the auction. Only possible for the seller or the operator. There must be no buyer present for that auction. NFT asset is sent back to the seller.
 * @param testnet chain to work with
 * @param body request data
 * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
 * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
 */
export const prepareAuctionCancel = async (testnet: boolean, body: InvokeAuctionOperation, provider?: string) => {
  const params = await prepareAuctionCancelAbstraction(body)
  return await helperPrepareSCCall(testnet, body, 'cancelAuction', params, undefined, provider, auction.abi)
}

/**
 * Settle auction. There must be buyer present for that auction. NFT will be sent to the bidder, assets to the seller and fee to the operator.
 * @param testnet chain to work with
 * @param body request data
 * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
 * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
 */
export const prepareAuctionSettle = async (testnet: boolean, body: InvokeAuctionOperation, provider?: string) => {
  const params = await prepareAuctionSettleAbstraction(body)
  return await helperPrepareSCCall(testnet, body, 'settleAuction', params, undefined, provider, auction.abi)
}

/**
 * Update auction fee.
 * @param testnet chain to work with
 * @param body request data
 * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
 * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
 */
export const sendAuctionUpdateFee = async (testnet: boolean, body: UpdateAuctionFee, provider?: string) =>
  helperBroadcastTx(body.chain, await prepareAuctionUpdateFee(testnet, body, provider), body.signatureId)

/**
 * Update auction fee recipient.
 * @param testnet chain to work with
 * @param body request data
 * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
 * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
 */
export const sendAuctionUpdateFeeRecipient = async (testnet: boolean, body: UpdateMarketplaceFeeRecipient, provider?: string) =>
  helperBroadcastTx(body.chain, await prepareAuctionUpdateFeeRecipient(testnet, body, provider), body.signatureId)
/**
 * Approve NFT transfer for auction to perform listing of the asset.
 * @param testnet chain to work with
 * @param body request data
 * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
 * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
 */
export const sendAuctionApproveNftTransfer = async (testnet: boolean, body: ApproveNftTransfer, provider?: string) =>
  helperBroadcastTx(body.chain, await prepareAuctionApproveNftTransfer(testnet, body, provider), body.signatureId)
/**
 * Approve ERC20 transfer for auction to perform bidding on the asset in the auction.
 * @param testnet chain to work with
 * @param body request data
 * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
 * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
 */
export const sendAuctionApproveErc20Transfer = async (testnet: boolean, body: ApproveErc20, provider?: string) =>
  helperBroadcastTx(body.chain, await prepareAuctionApproveErc20Transfer(testnet, body, provider), body.signatureId)
/**
 * Create new auction on the auction contract. Before auction, seller must approve spending of the NFT token for the Auction contract.
 * After auction is created, auction contract transfers the asset to the auction smart contract.
 * Only auction for existing NFTs can be created - seller must be owner of the NFT asset.
 * @param testnet chain to work with
 * @param body request data
 * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
 * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
 */
export const sendAuctionCreate = async (testnet: boolean, body: CreateAuction, provider?: string) =>
  helperBroadcastTx(body.chain, await prepareAuctionCreate(testnet, body, provider), body.signatureId)
/**
 * Bid auction on the auction. Buyer must either send native assets with this operation, or approve ERC20 token spending before.
 * After auction is sold, it's in a pending state to be processed by the auction. Noone receives the assets unless the auction operator processes that.
 * @param testnet chain to work with
 * @param body request data
 * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
 * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
 */
export const sendAuctionBid = async (testnet: boolean, body: InvokeAuctionOperation, provider?: string) =>
  helperBroadcastTx(body.chain, await prepareAuctionBid(testnet, body, provider), body.signatureId)
/**
 * Cancel auction on the auction. Only possible for the seller or the operator. There must be no buyer present for that auction. NFT asset is sent back to the seller.
 * @param testnet chain to work with
 * @param body request data
 * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
 * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
 */
export const sendAuctionCancel = async (testnet: boolean, body: InvokeAuctionOperation, provider?: string) =>
  helperBroadcastTx(body.chain, await prepareAuctionCancel(testnet, body, provider), body.signatureId)

/**
 * Settle auction. There must be buyer present for that auction. NFT will be sent to the bidder, assets to the seller and fee to the operator.
 * @param testnet chain to work with
 * @param body request data
 * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
 * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
 */
export const sendAuctionSettle = async (testnet: boolean, body: InvokeAuctionOperation, provider?: string) =>
  helperBroadcastTx(body.chain, await prepareAuctionSettle(testnet, body, provider), body.signatureId)
