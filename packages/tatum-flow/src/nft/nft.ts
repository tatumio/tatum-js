import {
  getNFTTransactionsByAddress as getNFTTransactionsByAddressDefi,
  getNFTsByAddress as getNFTsByAddressDefi,
  getNFTProvenanceData as getNFTProvenanceDataDefi,
  getNFTContractAddress as getNFTContractAddressDefi,
  getNFTMetadataURI as getNFTMetadataURIDefi,
  getNFTImage as getNFTImageDefi,
  getNFTRoyalty as getNFTRoyaltyDefi,
  mintNFTRequest,
  createNFTAbstraction,
} from '@tatumio/tatum-defi'
import { post, TransactionHash, Currency, Sort, ChainMintErc721 } from '@tatumio/tatum-core'
import {
  ChainFlowBurnNft,
  ChainFlowDeployNft,
  ChainFlowMintMultipleNft,
  ChainFlowMintNft,
  ChainFlowTransferNft,
  FlowDeployNft,
} from '../model'
import { sendFlowNftBurnToken, sendFlowNftMintMultipleToken, sendFlowNftMintToken, sendFlowNftTransferToken } from '../transaction'

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
  return sendFlowNftMintToken(!!options?.testnet, body)
}

/**
 * Mint multiple new NFT tokens.
 * @param testnet if we use testnet or not
 * @param body body of the mint request
 */
export const mintMultipleNFTWithUri = async (testnet: boolean, body: ChainFlowMintMultipleNft) => {
  return sendFlowNftMintMultipleToken(testnet, body)
}

/**
 * Burn new NFT token. Token will no longer exists.
 * @param testnet if we use testnet or not
 * @param body body of the mint request
 */
export const burnNFT = async (testnet: boolean, body: ChainFlowBurnNft) => {
  return sendFlowNftBurnToken(testnet, body)
}

/**
 * Transfer new NFT token to new recipient.
 * @param testnet if we use testnet or not
 * @param body body of the mint request
 */
export const transferNFT = async (testnet: boolean, body: ChainFlowTransferNft) => {
  return sendFlowNftTransferToken(testnet, body)
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
  return getNFTTransactionsByAddressDefi(Currency.FLOW, address, tokenAddress, pageSize, offset, from, to, sort)
}
export const getNFTsByAddress = async (contractAddress: string, address: string) => {
  return getNFTsByAddressDefi(Currency.FLOW, contractAddress, address)
}
export const getNFTProvenanceData = async (contractAddress: string, tokenId: string) => {
  return getNFTProvenanceDataDefi(Currency.FLOW, contractAddress, tokenId)
}
export const getNFTContractAddress = async (txId: string) => {
  return getNFTContractAddressDefi(Currency.FLOW, txId)
}
export const getNFTMetadataURI = async (contractAddress: string, tokenId: string, account?: string) => {
  return getNFTMetadataURIDefi(Currency.FLOW, contractAddress, tokenId, account)
}
export const getNFTImage = async (contractAddress: string, tokenId: string, account?: string) => {
  return getNFTImageDefi(Currency.FLOW, contractAddress, tokenId, account)
}
export const getNFTRoyalty = async (contractAddress: string, tokenId: string) => {
  return getNFTRoyaltyDefi(Currency.FLOW, contractAddress, tokenId)
}
