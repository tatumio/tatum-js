import {
  prepareAddMultiTokenMinterAbstraction,
  listing,
  ChainAddMinter,
  Currency,
  Sort,
  getMultiTokenTransactionsByAddress as getMultiTokenTransactionsByAddressCore,
  getMultiTokenContractAddress as getMultiTokenContractAddressCore,
  getMultiTokensBalance as getMultiTokensBalanceCore,
  getMultiTokensBatchBalance as getMultiTokensBatchBalanceCore,
  getMultiTokenTransaction as getMultiTokenTransactionCore,
  getMultiTokenMetadata as getMultiTokenMetadataCore,
} from '@tatumio/tatum-core'
import { helperBroadcastTx, helperPrepareSCCall } from '../helpers'

/**
 * Prepare add new minter to the MultiToken (1155) contract transaction.
 * @param body body of the add minter request
 * @param provider optional provider do broadcast tx
 */
export const prepareAddMultiTokenMinter = async (body: ChainAddMinter, provider?: string) => {
  const params = await prepareAddMultiTokenMinterAbstraction({ ...body, chain: Currency.TRON })
  return await helperPrepareSCCall(body, 'grantRole', params, undefined, provider, listing.abi)
}

/**
 * Add new minter to the MultiToken (1155) contract.
 * @param body body of the add minter request
 * @param provider optional provider do broadcast tx
 */
export const sendAddMultiTokenMinter = async (body: ChainAddMinter, provider?: string) =>
  helperBroadcastTx(await prepareAddMultiTokenMinter(body, provider), body.signatureId)

export const getMultiTokenTransactionsByAddress = async (
  address: string,
  tokenAddress: string,
  pageSize = 50,
  offset = 0,
  from?: string,
  to?: string,
  sort?: Sort
) => {
  return getMultiTokenTransactionsByAddressCore(Currency.TRON, address, tokenAddress, pageSize, offset, from, to, sort)
}
export const getMultiTokenContractAddress = async (txId: string) => {
  return getMultiTokenContractAddressCore(Currency.TRON, txId)
}
export const getMultiTokensBalance = async (contractAddress: string, address: string, tokenId: string) => {
  return getMultiTokensBalanceCore(Currency.TRON, contractAddress, address, tokenId)
}
export const getMultiTokensBatchBalance = async (contractAddress: string, address: string, tokenIds: string) => {
  return getMultiTokensBatchBalanceCore(Currency.TRON, contractAddress, address, tokenIds)
}
export const getMultiTokenTransaction = async (txId: string) => {
  return getMultiTokenTransactionCore(Currency.TRON, txId)
}
export const getMultiTokenMetadata = async (contractAddress: string, tokenId: string) => {
  return getMultiTokenMetadataCore(Currency.TRON, contractAddress, tokenId)
}
