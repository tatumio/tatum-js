import {
  createNFTAbstraction,
  mintNFTRequest,
} from '@tatumio/tatum-defi'
import {
  BurnErc721,
  DeployErc721,
  MintErc721,
  MintMultipleErc721,
  TransactionHash,
  TransferErc721,
  UpdateCashbackErc721,
} from '@tatumio/tatum-core'
import { OneMint721 } from '../model/request'
import {
  sendOneBurn721SignedTransaction,
  sendOneDeploy721SignedTransaction,
  sendOneMint721SignedTransaction,
  sendOneMintCashback721SignedTransaction,
  sendOneMintMultiple721SignedTransaction,
  sendOneMintMultipleCashback721SignedTransaction,
  sendOneTransfer721SignedTransaction,
  sendOneUpdateCashbackForAuthor721SignedTransaction,
} from '../transaction'

export const mintNFT = (body: OneMint721) => mintNFTRequest(body)

/**
 * Deploy new NFT smart contract, which will be used for later minting.
 * @param testnet if we use testnet or not
 * @param body body of the mint request
 * @param provider optional provider do broadcast tx
 */
export const deployNFT = async (testnet: boolean, body: DeployErc721, provider?: string): Promise<TransactionHash> => {
  return sendOneDeploy721SignedTransaction(testnet, body, provider)
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
  return await createNFTAbstraction(() => mintNFTWithUri(testnet, body, provider), testnet, body, file, name, description, scheme, provider)
}

/**
 * Mint new NFT token.
 * @param testnet if we use testnet or not
 * @param body body of the mint request
 * @param provider optional provider do broadcast tx
 */
export const mintNFTWithUri = async (testnet: boolean, body: MintErc721, provider?: string): Promise<TransactionHash> => {
  if (body.authorAddresses) {
    return sendOneMintCashback721SignedTransaction(testnet, body, provider)
  } else {
    return sendOneMint721SignedTransaction(testnet, body, provider)
  }
}

/**
 * Mint multiple new NFT tokens.
 * @param testnet if we use testnet or not
 * @param body body of the mint request
 * @param provider optional provider do broadcast tx
 */
export const mintMultipleNFTWithUri = async (testnet: boolean, body: MintMultipleErc721, provider?: string) => {
  if (body.authorAddresses) {
    return sendOneMintMultipleCashback721SignedTransaction(testnet, body, provider)
  } else {
    return sendOneMintMultiple721SignedTransaction(testnet, body, provider)
  }
}

/**
 * Burn new NFT token. Token will no longer exists.
 * @param testnet if we use testnet or not
 * @param body body of the mint request
 * @param provider optional provider do broadcast tx
 */
export const burnNFT = async (testnet: boolean, body: BurnErc721, provider?: string) => {
  return sendOneBurn721SignedTransaction(testnet, body, provider)
}

/**
 * Update royalty cashback as author of the NFT token.
 * @param testnet if we use testnet or not
 * @param body body of the mint request
 * @param provider optional provider do broadcast tx
 */
export const updateCashbackForAuthorNFT = async (testnet: boolean, body: UpdateCashbackErc721, provider?: string) => {
  return sendOneUpdateCashbackForAuthor721SignedTransaction(testnet, body, provider)
}

/**
 * Transfer new NFT token to new recipient.
 * @param testnet if we use testnet or not
 * @param body body of the mint request
 * @param provider optional provider do broadcast tx
 */
export const transferNFT = async (testnet: boolean, body: TransferErc721, provider?: string) => {
  return sendOneTransfer721SignedTransaction(testnet, body, provider)
}

export { getNFTsByAddress, getNFTContractAddress, getNFTMetadataURI, getNFTImage, getNFTRoyalty } from '@tatumio/tatum-defi'
