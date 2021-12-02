import {
  getMultiTokenTransactionsByAddress as getMultiTokenTransactionsByAddressCore,
  getMultiTokenContractAddress as getMultiTokenContractAddressCore,
  getMultiTokensBalance as getMultiTokensBalanceCore,
  getMultiTokensBatchBalance as getMultiTokensBatchBalanceCore,
  getMultiTokenTransaction as getMultiTokenTransactionCore,
  getMultiTokenMetadata as getMultiTokenMetadataCore,
  Currency,
  Sort,
} from '@tatumio/tatum-core'

export const getMultiTokenTransactionsByAddress = async (
  address: string,
  tokenAddress: string,
  pageSize = 50,
  offset = 0,
  from?: string,
  to?: string,
  sort?: Sort
) => {
  return getMultiTokenTransactionsByAddressCore(Currency.ADA, address, tokenAddress, pageSize, offset, from, to, sort)
}
export const getMultiTokenContractAddress = async (txId: string) => {
  return getMultiTokenContractAddressCore(Currency.ADA, txId)
}
export const getMultiTokensBalance = async (contractAddress: string, address: string, tokenId: string) => {
  return getMultiTokensBalanceCore(Currency.ADA, contractAddress, address, tokenId)
}
export const getMultiTokensBatchBalance = async (contractAddress: string, address: string, tokenIds: string) => {
  return getMultiTokensBatchBalanceCore(Currency.ADA, contractAddress, address, tokenIds)
}
export const getMultiTokenTransaction = async (txId: string) => {
  return getMultiTokenTransactionCore(Currency.ADA, txId)
}
export const getMultiTokenMetadata = async (contractAddress: string, tokenId: string) => {
  return getMultiTokenMetadataCore(Currency.ADA, contractAddress, tokenId)
}
