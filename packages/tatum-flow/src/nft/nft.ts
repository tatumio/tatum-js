import { mintNFTRequest, createNFTAbstraction } from '@tatumio/tatum-defi'
import { post, TransactionHash, MintErc721 } from '@tatumio/tatum-core'
import { FlowBurnNft, FlowDeployNft, FlowMintMultipleNft, FlowMintNft, FlowTransferNft } from '../model'
import { sendFlowNftBurnToken, sendFlowNftMintMultipleToken, sendFlowNftMintToken, sendFlowNftTransferToken } from '../transaction'

export const mintNFT = (body: MintErc721): Promise<TransactionHash> => mintNFTRequest(body)

/**
 * Deploy new NFT smart contract, which will be used for later minting.
 * @param body body of the mint request
 */
export const deployNFT = async (body: FlowDeployNft): Promise<TransactionHash> => {
  return post('/v3/nft/deploy', body, FlowDeployNft)
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
export const createNFT = async (body: FlowMintNft, file: Buffer, name: string, description?: string, scheme?: any, provider?: string) => {
  // @ts-ignore - to be fixed with generic types
  return await createNFTAbstraction(mintNFTWithUri, false, body, file, name, description, scheme, provider)
}

/**
 * Mint new NFT token.
 * @param body body of the mint request
 * @param options
 * @param options.testnet if we use testnet or not
 */
export const mintNFTWithUri = async (body: FlowMintNft, options?: { testnet?: boolean }): Promise<TransactionHash> => {
  return sendFlowNftMintToken(!!options?.testnet, body as FlowMintNft)
}

/**
 * Mint multiple new NFT tokens.
 * @param testnet if we use testnet or not
 * @param body body of the mint request
 */
export const mintMultipleNFTWithUri = async (testnet: boolean, body: FlowMintMultipleNft) => {
  return sendFlowNftMintMultipleToken(testnet, body as FlowMintMultipleNft)
}

/**
 * Burn new NFT token. Token will no longer exists.
 * @param testnet if we use testnet or not
 * @param body body of the mint request
 */
export const burnNFT = async (testnet: boolean, body: FlowBurnNft) => {
  return sendFlowNftBurnToken(testnet, body as FlowBurnNft)
}

/**
 * Transfer new NFT token to new recipient.
 * @param testnet if we use testnet or not
 * @param body body of the mint request
 */
export const transferNFT = async (testnet: boolean, body: FlowTransferNft) => {
  return sendFlowNftTransferToken(testnet, body as FlowTransferNft)
}

export {
  getNFTsByAddress,
  getNFTProvenanceData,
  getNFTContractAddress,
  getNFTMetadataURI,
  getNFTImage,
  getNFTRoyalty,
} from '@tatumio/tatum-defi'
