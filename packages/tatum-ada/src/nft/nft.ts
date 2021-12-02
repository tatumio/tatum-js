import {
  getNFTContractAddress as getNFTContractAddressDefi,
  getNFTImage as getNFTImageDefi,
  getNFTMetadataURI as getNFTMetadataURIDefi,
  getNFTProvenanceData as getNFTProvenanceDataDefi,
  getNFTRoyalty as getNFTRoyaltyDefi,
  getNFTsByAddress as getNFTsByAddressDefi,
  getNFTTransactionsByAddress as getNFTTransactionsByAddressDefi,
} from '@tatumio/tatum-defi'
import { Currency, Sort } from '@tatumio/tatum-core'

export const getNFTTransactionsByAddress = async (
  address: string,
  tokenAddress: string,
  pageSize = 50,
  offset = 0,
  from?: string,
  to?: string,
  sort?: Sort
) => {
  return getNFTTransactionsByAddressDefi(Currency.ADA, address, tokenAddress, pageSize, offset, from, to, sort)
}
export const getNFTsByAddress = async (contractAddress: string, address: string) => {
  return getNFTsByAddressDefi(Currency.ADA, contractAddress, address)
}
export const getNFTProvenanceData = async (contractAddress: string, tokenId: string) => {
  return getNFTProvenanceDataDefi(Currency.ADA, contractAddress, tokenId)
}
export const getNFTContractAddress = async (txId: string) => {
  return getNFTContractAddressDefi(Currency.ADA, txId)
}
export const getNFTMetadataURI = async (contractAddress: string, tokenId: string, account?: string) => {
  return getNFTMetadataURIDefi(Currency.ADA, contractAddress, tokenId, account)
}
export const getNFTImage = async (contractAddress: string, tokenId: string, account?: string) => {
  return getNFTImageDefi(Currency.ADA, contractAddress, tokenId, account)
}
export const getNFTRoyalty = async (contractAddress: string, tokenId: string) => {
  return getNFTRoyaltyDefi(Currency.ADA, contractAddress, tokenId)
}
