import {
  MintErc721,
  DeployErc721,
  MintMultipleErc721,
  BurnErc721,
  TransferErc721,
  mintNFTRequest,
  TransactionHash,
  createNFTAbstraction,
  UpdateCashbackErc721,
} from '@tatumio/tatum-core'
import {
  sendPolygonBurnErc721SignedTransaction,
  sendPolygonDeployErc721SignedTransaction,
  sendPolygonMintCashbackErc721SignedTransaction,
  sendPolygonMintErc721SignedTransaction,
  sendPolygonMintMultipleCashbackErc721SignedTransaction,
  sendPolygonMintMultipleErc721SignedTransaction,
  sendPolygonTransferErc721SignedTransaction,
  sendPolygonUpdateCashbackForAuthorErc721SignedTransaction,
} from '../transaction'

export const mintNFT = (body: MintErc721) => mintNFTRequest(body)

/**
 * Deploy new NFT smart contract, which will be used for later minting.
 * @param testnet if we use testnet or not
 * @param body body of the mint request
 * @param provider optional provider do broadcast tx
 */
export const deployNFT = async (testnet: boolean, body: DeployErc721, provider?: string): Promise<TransactionHash> => {
  return sendPolygonDeployErc721SignedTransaction(testnet, body as DeployErc721, provider)
}

/**
 * Mint new NFT token with metadata stored on the IPFS.
 * @param testnet if we use testnet or not
 * @param body body of the mint request
 * @param file file to be stored on the IPFS
 * @param name name of the file
 * @param description description of the file
 * @param scheme optional JSON Metadata scheme
 * @param provider optional provider do broadcast tx
 */
export const createNFT = async (
  testnet: boolean,
  body: MintErc721,
  file: Buffer,
  name: string,
  description?: string,
  scheme?: any,
  provider?: string
) => {
  return await createNFTAbstraction(mintNFTWithUri, testnet, body, file, name, description, scheme, provider)
}

/**
 * Mint new NFT token.
 * @param body body of the mint request
 * @param provider optional provider do broadcast tx
 */
export const mintNFTWithUri = async (body: MintErc721, provider?: string): Promise<TransactionHash> => {
  if ((body as MintErc721).authorAddresses) {
    return sendPolygonMintCashbackErc721SignedTransaction(body as MintErc721, provider)
  } else {
    return sendPolygonMintErc721SignedTransaction(body as MintErc721, provider)
  }
}

/**
 * Mint multiple new NFT tokens.
 * @param body body of the mint request
 * @param provider optional provider do broadcast tx
 */
export const mintMultipleNFTWithUri = async (body: MintMultipleErc721, provider?: string) => {
  if ((body as MintMultipleErc721).authorAddresses) {
    return sendPolygonMintMultipleCashbackErc721SignedTransaction(body as MintMultipleErc721, provider)
  } else {
    return sendPolygonMintMultipleErc721SignedTransaction(body as MintMultipleErc721, provider)
  }
}

/**
 * Burn new NFT token. Token will no longer exists.
 * @param body body of the mint request
 * @param provider optional provider do broadcast tx
 */
export const burnNFT = async (body: BurnErc721, provider?: string) => {
  return sendPolygonBurnErc721SignedTransaction(body, provider)
}

/**
 * Update royalty cashback as author of the NFT token.
 * @param testnet if we use testnet or not
 * @param body body of the mint request
 * @param provider optional provider do broadcast tx
 */
export const updateCashbackForAuthorNFT = async (testnet: boolean, body: UpdateCashbackErc721, provider?: string) => {
  return sendPolygonUpdateCashbackForAuthorErc721SignedTransaction(testnet, body, provider)
}

/**
 * Transfer new NFT token to new recipient.
 * @param testnet if we use testnet or not
 * @param body body of the mint request
 * @param provider optional provider do broadcast tx
 */
export const transferNFT = async (testnet: boolean, body: TransferErc721, provider?: string) => {
  return sendPolygonTransferErc721SignedTransaction(testnet, body, provider)
}

export { getNFTsByAddress, getNFTContractAddress, getNFTMetadataURI, getNFTImage, getNFTRoyalty } from '@tatumio/tatum-core'
