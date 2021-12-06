import { post, TransactionHash, erc721TokenABI, Currency, Sort, ChainAddMinter } from '@tatumio/tatum-core'
import {
  ChainTronBurnTrc721,
  ChainTronDeployTrc721,
  ChainTronMintMultipleTrc721,
  ChainTronMintTrc721,
  ChainTronTransferTrc721,
  ChainTronUpdateCashbackTrc721,
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
import { helperBroadcastTx, helperPrepareSCCall } from '../helpers'
import {
  createNFTAbstraction,
  prepareAddNFTMinterAbstraction,
  getNFTTransactionsByAddress as getNFTTransactionsByAddressDefi,
  getNFTsByAddress as getNFTsByAddressDefi,
  getNFTProvenanceData as getNFTProvenanceDataDefi,
  getNFTContractAddress as getNFTContractAddressDefi,
  getNFTMetadataURI as getNFTMetadataURIDefi,
  getNFTImage as getNFTImageDefi,
  getNFTRoyalty as getNFTRoyaltyDefi,
} from '@tatumio/tatum-defi'

export const mintNFT = (body: ChainTronMintTrc721): Promise<TransactionHash> => post(`/v3/nft/mint`, { ...body, chain: Currency.TRON })

/**
 * Deploy new NFT smart contract, which will be used for later minting.
 * @param body body of the mint request
 */
export const deployNFT = async (body: ChainTronDeployTrc721): Promise<TransactionHash> => {
  return sendTronDeployTrc721SignedTransaction(body)
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
  body: ChainTronMintTrc721,
  file: Buffer,
  name: string,
  description?: string,
  scheme?: any,
  provider?: string
) => {
  return await createNFTAbstraction(mintNFTWithUri, testnet, { ...body, chain: Currency.TRON }, file, name, description, scheme, provider)
}

/**
 * Mint new NFT token.
 * @param body body of the mint request
 */
export const mintNFTWithUri = async (body: ChainTronMintTrc721): Promise<TransactionHash> => {
  if (body.authorAddresses) {
    return sendTronMintCashbackTrc721SignedTransaction(body)
  } else {
    return sendTronMintTrc721SignedTransaction(body)
  }
}

/**
 * Mint multiple new NFT tokens.
 * @param body body of the mint request
 */
export const mintMultipleNFTWithUri = async (body: ChainTronMintMultipleTrc721) => {
  if (body.authorAddresses) {
    throw new Error('Unsupported operation.')
  } else {
    return sendTronMintMultipleTrc721SignedTransaction(body)
  }
}

/**
 * Burn new NFT token. Token will no longer exists.
 * @param body body of the mint request
 */
export const burnNFT = async (body: ChainTronBurnTrc721) => {
  return sendTronBurnTrc721SignedTransaction(body)
}

/**
 * Update royalty cashback as author of the NFT token.
 * @param body body of the mint request
 */
export const updateCashbackForAuthorNFT = async (body: ChainTronUpdateCashbackTrc721) => {
  return sendTronUpdateCashbackForAuthorTrc721SignedTransaction(body)
}

/**
 * Transfer new NFT token to new recipient.
 * @param body body of the mint request
 */
export const transferNFT = async (body: ChainTronTransferTrc721) => {
  return sendTronTransferTrc721SignedTransaction(body)
}

/**
 * Prepare add new minter to the NFT contract transaction.
 * @param body body of the add minter request
 * @param provider optional provider do broadcast tx
 */
export const prepareAddNFTMinter = async (body: ChainAddMinter, provider?: string) => {
  const params = await prepareAddNFTMinterAbstraction({ ...body, chain: Currency.TRON })
  return await helperPrepareSCCall(body, 'grantRole', params, undefined, provider, erc721TokenABI)
}

/**
 * Add new minter to the NFT contract.
 * @param body body of the add minter request
 * @param provider optional provider do broadcast tx
 */
export const sendAddNFTMinter = async (body: ChainAddMinter, provider?: string) =>
  helperBroadcastTx(await prepareAddNFTMinter(body, provider), body.signatureId)

export const getNFTTransactionsByAddress = async (
  address: string,
  tokenAddress: string,
  pageSize = 50,
  offset = 0,
  from?: string,
  to?: string,
  sort?: Sort
) => {
  return getNFTTransactionsByAddressDefi(Currency.TRON, address, tokenAddress, pageSize, offset, from, to, sort)
}
export const getNFTsByAddress = async (contractAddress: string, address: string) => {
  return getNFTsByAddressDefi(Currency.TRON, contractAddress, address)
}
export const getNFTProvenanceData = async (contractAddress: string, tokenId: string) => {
  return getNFTProvenanceDataDefi(Currency.TRON, contractAddress, tokenId)
}
export const getNFTContractAddress = async (txId: string) => {
  return getNFTContractAddressDefi(Currency.TRON, txId)
}
export const getNFTMetadataURI = async (contractAddress: string, tokenId: string, account?: string) => {
  return getNFTMetadataURIDefi(Currency.TRON, contractAddress, tokenId, account)
}
export const getNFTImage = async (contractAddress: string, tokenId: string, account?: string) => {
  return getNFTImageDefi(Currency.TRON, contractAddress, tokenId, account)
}
export const getNFTRoyalty = async (contractAddress: string, tokenId: string) => {
  return getNFTRoyaltyDefi(Currency.TRON, contractAddress, tokenId)
}
