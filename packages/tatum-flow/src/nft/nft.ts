import {
  getNFTsByAddress as getNFTsByAddressDefi,
  getNFTMetadataURI as getNFTMetadataURIDefi,
  getNFTImage as getNFTImageDefi,
  getNFTRoyalty as getNFTRoyaltyDefi,
  mintNFTRequest,
  createNFTAbstraction,
  post,
  TransactionHash,
  Currency,
  ChainMintErc721,
} from '@tatumio/tatum-core'
import {
  ChainFlowBurnNft,
  ChainFlowDeployNft,
  ChainFlowMintMultipleNft,
  ChainFlowMintNft,
  ChainFlowTransferNft,
  FlowDeployNft,
} from '../model'
import { sendNftBurnToken, sendNftMintMultipleToken, sendNftMintToken, sendNftTransferToken } from '../transaction'

export const mintNFT = (body: ChainMintErc721): Promise<TransactionHash> => mintNFTRequest({ ...body, chain: Currency.FLOW })

/**
 * Deploy new NFT smart contract, which will be used for later minting.
 * @param body body of the mint request
 */
export const deployNFT = async (body: ChainFlowDeployNft): Promise<TransactionHash> => {
  return post('/v3/nft/deploy', { ...body, chain: Currency.FLOW }, FlowDeployNft)
}

/**
 * Mint new NFT token with metadata stored on the IPFS.
 * @param body body of the mint request
 * @param file file to be stored on the IPFS
 * @param name name of the file
 * @param description description of the file
 * @param scheme optional JSON Metadata scheme
 * @param provider optional provider do broadcast tx
 */
export const createNFT = async (
  body: ChainFlowMintNft,
  file: Buffer,
  name: string,
  description?: string,
  scheme?: any,
  provider?: string
) => {
  return await createNFTAbstraction(mintNFTWithUri, false, { ...body, chain: Currency.FLOW }, file, name, description, scheme, provider)
}

/**
 * Mint new NFT token.
 * @param body body of the mint request
 * @param options
 * @param options.testnet if we use testnet or not
 */
export const mintNFTWithUri = async (body: ChainFlowMintNft, options?: { testnet?: boolean }): Promise<TransactionHash> => {
  return sendNftMintToken(!!options?.testnet, body)
}

/**
 * Mint multiple new NFT tokens.
 * @param testnet if we use testnet or not
 * @param body body of the mint request
 */
export const mintMultipleNFTWithUri = async (testnet: boolean, body: ChainFlowMintMultipleNft) => {
  return sendNftMintMultipleToken(testnet, body)
}

/**
 * Burn new NFT token. Token will no longer exists.
 * @param testnet if we use testnet or not
 * @param body body of the mint request
 */
export const burnNFT = async (testnet: boolean, body: ChainFlowBurnNft) => {
  return sendNftBurnToken(testnet, body)
}

/**
 * Transfer new NFT token to new recipient.
 * @param testnet if we use testnet or not
 * @param body body of the mint request
 */
export const transferNFT = async (testnet: boolean, body: ChainFlowTransferNft) => {
  return sendNftTransferToken(testnet, body)
}

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/NftGetBalanceErc721" target="_blank">Tatum API documentation</a>
 */
export const getNFTsByAddress = async (contractAddress: string, address: string) => {
  return getNFTsByAddressDefi(Currency.FLOW, contractAddress, address)
}

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/NftGetMetadataErc721" target="_blank">Tatum API documentation</a>
 */
export const getNFTMetadataURI = async (contractAddress: string, tokenId: string, account?: string) => {
  return getNFTMetadataURIDefi(Currency.FLOW, contractAddress, tokenId, account)
}

/**
 * Get IPFS image URL from the NFT with the IPFS Metadata scheme. URL
 * @param contractAddress contract address of the NFT token
 * @param tokenId ID of the token
 * @param account FLOW only - account where the token is minted
 */
export const getNFTImage = async (contractAddress: string, tokenId: string, account?: string) => {
  return getNFTImageDefi(Currency.FLOW, contractAddress, tokenId, account)
}
export const getNFTRoyalty = async (contractAddress: string, tokenId: string) => {
  return getNFTRoyaltyDefi(Currency.FLOW, contractAddress, tokenId)
}
