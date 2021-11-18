import { post, TransactionHash, erc721TokenABI as abi, AddMinter } from '@tatumio/tatum-core'
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
import { helperBroadcastTx, helperPrepareSCCall } from 'src/helpers'
import { createNFTAbstraction, prepareAddNFTMinterAbstraction } from '@tatumio/tatum-defi'

export const mintNFT = (body: TronMintTrc721): Promise<TransactionHash> => post(`/v3/nft/mint`, body)

/**
 * Deploy new NFT smart contract, which will be used for later minting.
 * @param body body of the mint request
 */
export const deployNFT = async (body: TronDeployTrc721): Promise<TransactionHash> => {
  return sendTronDeployTrc721SignedTransaction(body as TronDeployTrc721)
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
  return await createNFTAbstraction(() => mintNFTWithUri(body), testnet, body, file, name, description, scheme, provider)
}

/**
 * Mint new NFT token.
 * @param body body of the mint request
 */
export const mintNFTWithUri = async (body: TronMintTrc721): Promise<TransactionHash> => {
  if ((body as TronMintTrc721).authorAddresses) {
    return sendTronMintCashbackTrc721SignedTransaction(body as TronMintTrc721)
  } else {
    return sendTronMintTrc721SignedTransaction(body as TronMintTrc721)
  }
}

/**
 * Mint multiple new NFT tokens.
 * @param body body of the mint request
 */
export const mintMultipleNFTWithUri = async (body: TronMintMultipleTrc721) => {
  if ((body as TronMintMultipleTrc721).authorAddresses) {
    throw new Error('Unsupported operation.')
  } else {
    return sendTronMintMultipleTrc721SignedTransaction(body as TronMintMultipleTrc721)
  }
}

/**
 * Burn new NFT token. Token will no longer exists.
 * @param body body of the mint request
 */
export const burnNFT = async (body: TronBurnTrc721) => {
  return sendTronBurnTrc721SignedTransaction(body as TronBurnTrc721)
}

/**
 * Update royalty cashback as author of the NFT token.
 * @param body body of the mint request
 */
export const updateCashbackForAuthorNFT = async (body: TronUpdateCashbackTrc721) => {
  return sendTronUpdateCashbackForAuthorTrc721SignedTransaction(body as TronUpdateCashbackTrc721)
}

/**
 * Transfer new NFT token to new recipient.
 * @param body body of the mint request
 */
export const transferNFT = async (body: TronTransferTrc721) => {
  return sendTronTransferTrc721SignedTransaction(body as TronTransferTrc721)
}

/**
 * Prepare add new minter to the NFT contract transaction.
 * @param testnet if we use testnet or not
 * @param body body of the add minter request
 * @param provider optional provider do broadcast tx
 */
export const prepareAddNFTMinter = async (testnet: boolean, body: AddMinter, provider?: string) => {
  const params = await prepareAddNFTMinterAbstraction(testnet, body, provider)
  return await helperPrepareSCCall(testnet, body, AddMinter, 'grantRole', params, undefined, provider, abi)
}

/**
 * Add new minter to the NFT contract.
 * @param testnet if we use testnet or not
 * @param body body of the add minter request
 * @param provider optional provider do broadcast tx
 */
export const sendAddNFTMinter = async (testnet: boolean, body: AddMinter, provider?: string) =>
  helperBroadcastTx(body.chain, await prepareAddNFTMinter(testnet, body, provider), body.signatureId)

export {
  getNFTsByAddress,
  getNFTProvenanceData,
  getNFTContractAddress,
  getNFTMetadataURI,
  getNFTImage,
  getNFTRoyalty,
} from '@tatumio/tatum-defi'
