import {
  createNFTAbstraction,
  getNFTContractAddress as getNFTContractAddressDefi,
  getNFTImage as getNFTImageDefi,
  getNFTMetadataURI as getNFTMetadataURIDefi,
  getNFTProvenanceData as getNFTProvenanceDataDefi,
  getNFTRoyalty as getNFTRoyaltyDefi,
  getNFTsByAddress as getNFTsByAddressDefi,
  getNFTTransactionsByAddress as getNFTTransactionsByAddressDefi,
} from '@tatumio/tatum-defi'
import {
  post,
  TransactionHash,
  ChainDeployErc721,
  ChainMintErc721,
  Currency,
  ChainMintMultipleErc721,
  ChainBurnErc721,
  ChainUpdateCashbackErc721,
  ChainTransferErc721,
  Sort,
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

export const mintNFT = (body: ChainMintErc721): Promise<TransactionHash> => post(`/v3/nft/mint`, body)

/**
 * Deploy new NFT smart contract, which will be used for later minting.
 * @param body body of the mint request
 * @param provider optional provider do broadcast tx
 */
export const deployNFT = async (body: ChainDeployErc721, provider?: string): Promise<TransactionHash> => {
  return sendXdcDeployErc721Transaction(body, provider)
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
  body: ChainMintErc721,
  file: Buffer,
  name: string,
  description?: string,
  scheme?: any,
  provider?: string
) => {
  return await createNFTAbstraction(mintNFTWithUri, false, { ...body, chain: Currency.XDC }, file, name, description, scheme, provider)
}

/**
 * Mint new NFT token.
 * @param body body of the mint request
 * @param options
 * @param options.provider optional provider do broadcast tx
 */
export const mintNFTWithUri = async (body: ChainMintErc721, options?: { provider?: string }): Promise<TransactionHash> => {
  if (body.authorAddresses) {
    return sendXdcMintErcCashback721Transaction(body, options?.provider)
  } else {
    return sendXdcMintErc721Transaction(body, options?.provider)
  }
}

/**
 * Mint multiple new NFT tokens.
 * @param body body of the mint request
 * @param provider optional provider do broadcast tx
 */
export const mintMultipleNFTWithUri = async (body: ChainMintMultipleErc721, provider?: string) => {
  if (body.authorAddresses) {
    return sendXdcMintMultipleCashbackErc721Transaction(body, provider)
  } else {
    return sendXdcMintMultipleErc721Transaction(body, provider)
  }
}

/**
 * Burn new NFT token. Token will no longer exists.
 * @param body body of the mint request
 * @param provider optional provider do broadcast tx
 */
export const burnNFT = async (body: ChainBurnErc721, provider?: string) => {
  return sendXdcBurnErc721Transaction(body, provider)
}

/**
 * Update royalty cashback as author of the NFT token.
 * @param body body of the mint request
 * @param provider optional provider do broadcast tx
 */
export const updateCashbackForAuthorNFT = async (body: ChainUpdateCashbackErc721, provider?: string) => {
  return sendXdcUpdateCashbackForAuthorErc721Transaction(body, provider)
}

/**
 * Transfer new NFT token to new recipient.
 * @param body body of the mint request
 * @param provider optional provider do broadcast tx
 */
export const transferNFT = async (body: ChainTransferErc721, provider?: string) => {
  return sendXdcErc721Transaction(body, provider)
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
  return getNFTTransactionsByAddressDefi(Currency.XDC, address, tokenAddress, pageSize, offset, from, to, sort)
}
export const getNFTsByAddress = async (contractAddress: string, address: string) => {
  return getNFTsByAddressDefi(Currency.XDC, contractAddress, address)
}
export const getNFTProvenanceData = async (contractAddress: string, tokenId: string) => {
  return getNFTProvenanceDataDefi(Currency.XDC, contractAddress, tokenId)
}
export const getNFTContractAddress = async (txId: string) => {
  return getNFTContractAddressDefi(Currency.XDC, txId)
}
export const getNFTMetadataURI = async (contractAddress: string, tokenId: string, account?: string) => {
  return getNFTMetadataURIDefi(Currency.XDC, contractAddress, tokenId, account)
}
export const getNFTImage = async (contractAddress: string, tokenId: string, account?: string) => {
  return getNFTImageDefi(Currency.XDC, contractAddress, tokenId, account)
}
export const getNFTRoyalty = async (contractAddress: string, tokenId: string) => {
  return getNFTRoyaltyDefi(Currency.XDC, contractAddress, tokenId)
}
