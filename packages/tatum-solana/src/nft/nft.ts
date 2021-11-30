/**
 * Create new NFT token.
 * @param testnet if we use testnet or not
 * @param body body of the create request
 * @param provider optional provider do broadcast tx
 */
import { SolanaMintNft } from '../model'
import { mintSolanaNft, transferSolanaNft } from '../transaction'
import { TransferErc721 } from '@tatumio/tatum-core'

/**
 * Mint NFT on Solana blockchain.
 * @param body body of the request
 * @param provider optional provider do broadcast tx
 */
export const mintNFT = async (body: SolanaMintNft, provider?: string) => {
  return mintSolanaNft(body, provider)
}

/**
 * Transfer Solana NFT token to new recipient.
 * @param body body of the mint request
 * @param provider optional provider do broadcast tx
 */
export const transferNFT = async (body: TransferErc721, provider?: string) => {
  return transferSolanaNft(body, provider)
}

export { getNFTsByAddress, getNFTMetadataURI, getNFTImage, getNFTRoyalty } from '@tatumio/tatum-defi'
