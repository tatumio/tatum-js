import {
  getNFTTransactionsByAddress as getNFTTransactionsByAddressDefi,
  getNFTsByAddress as getNFTsByAddressDefi,
  getNFTProvenanceData as getNFTProvenanceDataDefi,
  getNFTContractAddress as getNFTContractAddressDefi,
  getNFTMetadataURI as getNFTMetadataURIDefi,
  getNFTImage as getNFTImageDefi,
  getNFTRoyalty as getNFTRoyaltyDefi,
} from '@tatumio/tatum-defi'
import { DeployErc721, BurnErc721, TransferErc721, Sort, Currency } from '@tatumio/tatum-core'

import { sendAlgoCreateNFTSignedTransaction, sendAlgoTransferNFTSignedTransaction, sendAlgoBurnNFTSignedTransaction } from '../transaction'

export const getNFTTransactionsByAddress = async (
  address: string,
  tokenAddress: string,
  pageSize = 50,
  offset = 0,
  from?: string,
  to?: string,
  sort?: Sort
) => {
  return getNFTTransactionsByAddressDefi(Currency.ALGO, address, tokenAddress, pageSize, offset, from, to, sort)
}
export const getNFTsByAddress = async (contractAddress: string, address: string) => {
  return getNFTsByAddressDefi(Currency.ALGO, contractAddress, address)
}
export const getNFTProvenanceData = async (contractAddress: string, tokenId: string) => {
  return getNFTProvenanceDataDefi(Currency.ALGO, contractAddress, tokenId)
}
export const getNFTContractAddress = async (txId: string) => {
  return getNFTContractAddressDefi(Currency.ALGO, txId)
}
export const getNFTMetadataURI = async (contractAddress: string, tokenId: string, account?: string) => {
  return getNFTMetadataURIDefi(Currency.ALGO, contractAddress, tokenId, account)
}
export const getNFTImage = async (contractAddress: string, tokenId: string, account?: string) => {
  return getNFTImageDefi(Currency.ALGO, contractAddress, tokenId, account)
}
export const getNFTRoyalty = async (contractAddress: string, tokenId: string) => {
  return getNFTRoyaltyDefi(Currency.ALGO, contractAddress, tokenId)
}

/**
 * Create new NFT token.
 * @param testnet if we use testnet or not
 * @param body body of the create request
 * @param provider optional provider do broadcast tx
 */
export const deployNFT = async (testnet: boolean, body: DeployErc721, provider?: string) => {
  return sendAlgoCreateNFTSignedTransaction(testnet, body, provider)
}

/**
 * Burn new NFT token. Token will no longer exists.
 * @param testnet if we use testnet or not
 * @param body body of the burn request
 * @param provider optional provider do broadcast tx
 */
export const burnNFT = async (testnet: boolean, body: BurnErc721, provider?: string) => {
  return sendAlgoBurnNFTSignedTransaction(testnet, body, provider)
}

/**
 * Transfer new NFT token to new recipient.
 * @param testnet if we use testnet or not
 * @param body body of the mint request
 * @param provider optional provider do broadcast tx
 */
export const transferNFT = async (testnet: boolean, body: TransferErc721, provider?: string) => {
  return sendAlgoTransferNFTSignedTransaction(testnet, body, provider)
}
