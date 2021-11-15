import {
  post,
  createNFTAbstraction,
  BurnErc721,
  DeployErc721,
  MintErc721,
  MintMultipleErc721,
  TransferErc721,
  TransactionHash,
  UpdateCashbackErc721,
} from '@tatumio/tatum-core'

import {
  sendXdcDeployErc721Transaction,
  sendXdcMintErc721Transaction,
  sendXdcMintErcCashback721Transaction,
  sendXdcMintMultipleErc721Transaction,
  sendXdcMintMultipleCashbackErc721Transaction,
  sendXdcBurnErc721Transaction,
  sendXdcUpdateCashbackForAuthorErc721Transaction,
  sendXdcErc721Transaction,
} from '../transaction'

export { getNFTsByAddress, getNFTContractAddress, getNFTMetadataURI, getNFTImage, getNFTRoyalty } from '@tatumio/tatum-core'

export const mintNFT = (body: MintErc721): Promise<TransactionHash> => post(`/v3/nft/mint`, body)

/**
 * Deploy new NFT smart contract, which will be used for later minting.
 * @param body body of the mint request
 * @param provider optional provider do broadcast tx
 */
export const deployNFT = async (body: DeployErc721, provider?: string): Promise<TransactionHash> => {
  return sendXdcDeployErc721Transaction(body as DeployErc721, provider)
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
  return await createNFTAbstraction(() => mintXdcNFTWithUri(false, body, provider), false, body, file, name, description, scheme, provider)
}

/**
 * Mint new NFT token.
 * @param testnet if we use testnet or not
 * @param body body of the mint request
 * @param provider optional provider do broadcast tx
 */
export const mintXdcNFTWithUri = async (testnet: boolean, body: MintErc721, provider?: string): Promise<TransactionHash> => {
  if ((body as MintErc721).authorAddresses) {
    return sendXdcMintErcCashback721Transaction(body as MintErc721, provider)
  } else {
    return sendXdcMintErc721Transaction(body as MintErc721, provider)
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
    return sendXdcMintMultipleCashbackErc721Transaction(body as MintMultipleErc721, provider)
  } else {
    return sendXdcMintMultipleErc721Transaction(body as MintMultipleErc721, provider)
  }
}

/**
 * Burn new NFT token. Token will no longer exists.
 * @param testnet if we use testnet or not
 * @param body body of the mint request
 * @param provider optional provider do broadcast tx
 */
export const burnNFT = async (testnet: boolean, body: BurnErc721, provider?: string) => {
  return sendXdcBurnErc721Transaction(body, provider)
}

/**
 * Update royalty cashback as author of the NFT token.
 * @param testnet if we use testnet or not
 * @param body body of the mint request
 * @param provider optional provider do broadcast tx
 */
export const updateCashbackForAuthorNFT = async (testnet: boolean, body: UpdateCashbackErc721, provider?: string) => {
  return sendXdcUpdateCashbackForAuthorErc721Transaction(body, provider)
}

/**
 * Transfer new NFT token to new recipient.
 * @param testnet if we use testnet or not
 * @param body body of the mint request
 * @param provider optional provider do broadcast tx
 */
export const transferNFT = async (testnet: boolean, body: TransferErc721, provider?: string) => {
  return sendXdcErc721Transaction(body, provider)
}
