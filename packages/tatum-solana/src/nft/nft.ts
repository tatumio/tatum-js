import { ChainSolanaMintNft } from '../model'
import { mintSolanaNft, transferSolanaNft } from '../transaction'
import { ChainTransferErc721, Currency, Sort } from '@tatumio/tatum-core'
import {
  getNFTTransactionsByAddress as getNFTTransactionsByAddressDefi,
  getNFTsByAddress as getNFTsByAddressDefi,
  getNFTProvenanceData as getNFTProvenanceDataDefi,
  getNFTContractAddress as getNFTContractAddressDefi,
  getNFTMetadataURI as getNFTMetadataURIDefi,
  getNFTImage as getNFTImageDefi,
  getNFTRoyalty as getNFTRoyaltyDefi,
} from '@tatumio/tatum-defi'

/**
 * Mint NFT on Solana blockchain.
 * @param body body of the request
 * @param provider optional provider do broadcast tx
 */
export const mintNFT = async (body: ChainSolanaMintNft, provider?: string) => {
  return mintSolanaNft(body, provider)
}

/**
 * Transfer Solana NFT token to new recipient.
 * @param body body of the mint request
 * @param provider optional provider do broadcast tx
 */
export const transferNFT = async (body: ChainTransferErc721, provider?: string) => {
  return transferSolanaNft(body, provider)
}

export const getNFTTransactionsByAddress = async (
  address: string,
  tokenAddress: string,
  pageSize = 50,
  offset = 0,
  from?: string,
  to?: string,
  sort?: Sort
) => {
  return getNFTTransactionsByAddressDefi(Currency.SOL, address, tokenAddress, pageSize, offset, from, to, sort)
}
export const getNFTsByAddress = async (contractAddress: string, address: string) => {
  return getNFTsByAddressDefi(Currency.SOL, contractAddress, address)
}
export const getNFTProvenanceData = async (contractAddress: string, tokenId: string) => {
  return getNFTProvenanceDataDefi(Currency.SOL, contractAddress, tokenId)
}
export const getNFTContractAddress = async (txId: string) => {
  return getNFTContractAddressDefi(Currency.SOL, txId)
}
export const getNFTMetadataURI = async (contractAddress: string, tokenId: string, account?: string) => {
  return getNFTMetadataURIDefi(Currency.SOL, contractAddress, tokenId, account)
}
export const getNFTImage = async (contractAddress: string, tokenId: string, account?: string) => {
  return getNFTImageDefi(Currency.SOL, contractAddress, tokenId, account)
}
export const getNFTRoyalty = async (contractAddress: string, tokenId: string) => {
  return getNFTRoyaltyDefi(Currency.SOL, contractAddress, tokenId)
}
