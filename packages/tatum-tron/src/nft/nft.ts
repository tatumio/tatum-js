import { post, TransactionHash } from '@tatumio/tatum-core'
import {
  TronBurnTrc721,
  TronDeployTrc721,
  TronMintMultipleTrc721,
  TronMintTrc721,
  TronTransferTrc721,
  TronUpdateCashbackTrc721,
} from '../model'
import {
  sendTronBurnTrc721SignedTransaction,
  sendTronDeployTrc721SignedTransaction,
  sendTronMintCashbackTrc721SignedTransaction,
  sendTronMintMultipleTrc721SignedTransaction,
  sendTronMintTrc721SignedTransaction,
  sendTronTransferTrc721SignedTransaction,
  sendTronUpdateCashbackForAuthorTrc721SignedTransaction,
} from '../transaction'
import { createNFTAbstraction } from '@tatumio/tatum-defi'

export const mintNFT = (body: TronMintTrc721): Promise<TransactionHash> => post(`/v3/nft/mint`, body)

/**
 * Deploy new NFT smart contract, which will be used for later minting.
 * @param testnet if we use testnet or not
 * @param body body of the mint request
 * @param provider optional provider do broadcast tx
 */
export const deployNFT = async (testnet: boolean, body: TronDeployTrc721, provider?: string): Promise<TransactionHash> => {
  return sendTronDeployTrc721SignedTransaction(testnet, body as TronDeployTrc721)
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
  body: TronMintTrc721,
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
export const mintNFTWithUri = async (testnet: boolean, body: TronMintTrc721, provider?: string): Promise<TransactionHash> => {
  if ((body as TronMintTrc721).authorAddresses) {
    return sendTronMintCashbackTrc721SignedTransaction(testnet, body as TronMintTrc721)
  } else {
    return sendTronMintTrc721SignedTransaction(testnet, body as TronMintTrc721)
  }
}

/**
 * Mint multiple new NFT tokens.
 * @param testnet if we use testnet or not
 * @param body body of the mint request
 * @param provider optional provider do broadcast tx
 */
export const mintMultipleNFTWithUri = async (testnet: boolean, body: TronMintMultipleTrc721, provider?: string) => {
  if ((body as TronMintMultipleTrc721).authorAddresses) {
    throw new Error('Unsupported operation.')
  } else {
    return sendTronMintMultipleTrc721SignedTransaction(testnet, body as TronMintMultipleTrc721)
  }
}

/**
 * Burn new NFT token. Token will no longer exists.
 * @param testnet if we use testnet or not
 * @param body body of the mint request
 * @param provider optional provider do broadcast tx
 */
export const burnNFT = async (testnet: boolean, body: TronBurnTrc721, provider?: string) => {
  return sendTronBurnTrc721SignedTransaction(testnet, body as TronBurnTrc721)
}

/**
 * Update royalty cashback as author of the NFT token.
 * @param testnet if we use testnet or not
 * @param body body of the mint request
 * @param provider optional provider do broadcast tx
 */
export const updateCashbackForAuthorNFT = async (testnet: boolean, body: TronUpdateCashbackTrc721, provider?: string) => {
  return sendTronUpdateCashbackForAuthorTrc721SignedTransaction(testnet, body as TronUpdateCashbackTrc721)
}

/**
 * Transfer new NFT token to new recipient.
 * @param testnet if we use testnet or not
 * @param body body of the mint request
 * @param provider optional provider do broadcast tx
 */
export const transferNFT = async (testnet: boolean, body: TronTransferTrc721, provider?: string) => {
  return sendTronTransferTrc721SignedTransaction(testnet, body as TronTransferTrc721)
}

export { getNFTsByAddress, getNFTContractAddress, getNFTMetadataURI, getNFTImage, getNFTRoyalty } from '@tatumio/tatum-defi'
