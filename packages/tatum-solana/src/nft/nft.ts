/**
 * Create new NFT token.
 * @param testnet if we use testnet or not
 * @param body body of the create request
 * @param provider optional provider do broadcast tx
 */
import { SolanaMintNft, SolanaNftMetadata } from '../model'
import { mintSolanaNft, transferSolanaNft } from '../transaction'
import { Currency, get, TransferErc721 } from '@tatumio/tatum-core'

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

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/NftGetMetadataErc721" target="_blank">Tatum API documentation</a>
 */
export const getNFTMetadataURI = async (chain: Currency, contractAddress: string): Promise<{ onchainData: {data: SolanaNftMetadata} }> => {
  const url = `/v3/nft/metadata/${chain}/${contractAddress}`
  return get(url)
}

/**
 * Get NFT image url form the NFT metadata.
 * @param chain Chain to work with
 * @param contractAddress
 */
export const getNFTImage = async (chain: Currency, contractAddress: string): Promise<{ originalUrl: string }> => {
  const metadata = (await getNFTMetadataURI(chain, contractAddress)).onchainData
  return { originalUrl: metadata.data.uri }
}

/**
 * Get NFTs owned by the address
 * @param chain Chain to get NFTs from
 * @param address address which holds the NFTs
 */
export const getNFTsByAddress = async (chain: Currency, address: string): Promise<string[]> =>
  get(`/v3/nft/address/balance/${chain}/${address}`)

export { getNFTRoyalty } from '@tatumio/tatum-defi'
