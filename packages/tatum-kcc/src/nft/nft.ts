import {
  MintErc721,
  DeployErc721,
  MintMultipleErc721,
  BurnErc721,
  TransferErc721,
  TransactionHash,
  UpdateCashbackErc721,
} from '@tatumio/tatum-core'
import { mintNFTRequest, createNFTAbstraction } from '@tatumio/tatum-defi'
import {
  sendKccBurnErc721SignedTransaction,
  sendKccDeployErc721SignedTransaction,
  sendKccMintCashbackErc721SignedTransaction,
  sendKccMintErc721SignedTransaction,
  sendKccMintMultipleCashbackErc721SignedTransaction,
  sendKccMintMultipleErc721SignedTransaction,
  sendKccTransferErc721SignedTransaction,
  sendKccUpdateCashbackForAuthorErc721SignedTransaction,
} from '../transaction'

export const mintNFT = (body: MintErc721): Promise<TransactionHash> => mintNFTRequest(body)

/**
 * Deploy new NFT smart contract, which will be used for later minting.
 * @param testnet if we use testnet or not
 * @param body body of the mint request
 * @param provider optional provider do broadcast tx
 */
export const deployNFT = async (testnet: boolean, body: DeployErc721, provider?: string): Promise<TransactionHash> => {
  return sendKccDeployErc721SignedTransaction(testnet, body as DeployErc721, provider)
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
  if ((body as MintErc721).authorAddresses) {
    return sendKccMintCashbackErc721SignedTransaction(testnet, body as MintErc721, provider)
  } else {
    return sendKccMintErc721SignedTransaction(testnet, body as MintErc721, provider)
  }
}

/**
 * Mint multiple new NFT tokens.
 * @param testnet if we use testnet or not
 * @param body body of the mint request
 * @param provider optional provider do broadcast tx
 */
export const mintMultipleNFTWithUri = async (testnet: boolean, body: MintMultipleErc721, provider?: string) => {
  if ((body as MintMultipleErc721).authorAddresses) {
    return sendKccMintMultipleCashbackErc721SignedTransaction(testnet, body as MintMultipleErc721, provider)
  } else {
    return sendKccMintMultipleErc721SignedTransaction(testnet, body as MintMultipleErc721, provider)
  }
}

/**
 * Burn new NFT token. Token will no longer exists.
 * @param testnet if we use testnet or not
 * @param body body of the mint request
 * @param provider optional provider do broadcast tx
 */
export const burnNFT = async (testnet: boolean, body: BurnErc721, provider?: string) => {
  return sendKccBurnErc721SignedTransaction(testnet, body, provider)
}

/**
 * Update royalty cashback as author of the NFT token.
 * @param testnet if we use testnet or not
 * @param body body of the mint request
 * @param provider optional provider do broadcast tx
 */
export const updateCashbackForAuthorNFT = async (testnet: boolean, body: UpdateCashbackErc721, provider?: string) => {
  return sendKccUpdateCashbackForAuthorErc721SignedTransaction(testnet, body, provider)
}

/**
 * Transfer new NFT token to new recipient.
 * @param testnet if we use testnet or not
 * @param body body of the mint request
 * @param provider optional provider do broadcast tx
 */
export const transferNFT = async (testnet: boolean, body: TransferErc721, provider?: string) => {
  return sendKccTransferErc721SignedTransaction(testnet, body, provider)
}

export { getNFTsByAddress, getNFTContractAddress, getNFTMetadataURI, getNFTImage, getNFTRoyalty } from '@tatumio/tatum-defi'
