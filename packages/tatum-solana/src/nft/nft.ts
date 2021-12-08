import { ChainSolanaMintNft } from '../model'
import { mintSolanaNft, transferSolanaNft } from '../transaction'
import { ChainTransferErc721, Currency, Sort } from '@tatumio/tatum-core'
import {
  getNFTTransactionsByAddress as getNFTTransactionsByAddressDefi,
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

/**
 * For more details, see <a href="https://tatum.io/apidoc.php#operation/NftGetTransactionByAddress" target="_blank">Tatum API documentation</a>
 */
export const getNFTTransactionsByAddress = async (
  address: string,
  tokenAddress: string,
  pageSize: number,
  offset?: number,
  from?: number,
  to?: number,
  sort?: Sort
) => {
  return getNFTTransactionsByAddressDefi(Currency.SOL, address, tokenAddress, pageSize, offset, from, to, sort)
}

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/NftGetMetadataErc721" target="_blank">Tatum API documentation</a>
 */
export const getNFTMetadataURI = async (contractAddress: string, tokenId: string, account?: string) => {
  return getNFTMetadataURIDefi(Currency.SOL, contractAddress, tokenId, account)
}

/**
 * Get IPFS image URL from the NFT with the IPFS Metadata scheme. URL
 * @param contractAddress contract address of the NFT token
 * @param tokenId ID of the token
 * @param account FLOW only - account where the token is minted
 */
export const getNFTImage = async (contractAddress: string, tokenId: string, account?: string) => {
  return getNFTImageDefi(Currency.SOL, contractAddress, tokenId, account)
}

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/NftGetRoyaltyErc721" target="_blank">Tatum API documentation</a>
 */
export const getNFTRoyalty = async (contractAddress: string, tokenId: string) => {
  return getNFTRoyaltyDefi(Currency.SOL, contractAddress, tokenId)
}
