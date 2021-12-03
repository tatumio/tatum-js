import {
  createNFTAbstraction,
  getNFTContractAddress as getNFTContractAddressDefi,
  getNFTImage as getNFTImageDefi,
  getNFTMetadataURI as getNFTMetadataURIDefi,
  getNFTProvenanceData as getNFTProvenanceDataDefi,
  getNFTRoyalty as getNFTRoyaltyDefi,
  getNFTsByAddress as getNFTsByAddressDefi,
  getNFTTransactionsByAddress as getNFTTransactionsByAddressDefi,
  mintNFTRequest,
  prepareAddNFTMinterAbstraction,
} from '@tatumio/tatum-defi'
import {
  TransactionHash,
  erc721TokenABI,
  Sort,
  Currency,
  ChainDeployErc721,
  ChainMintErc721,
  ChainMintMultipleErc721,
  ChainBurnErc721,
  ChainUpdateCashbackErc721,
  ChainTransferErc721,
  ChainAddMinter,
} from '@tatumio/tatum-core'
import { ChainOneMint721 } from '../model/request'
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
import { helperBroadcastTx, helperPrepareSCCall } from '../helpers'

export const mintNFT = (body: ChainOneMint721): Promise<TransactionHash> => mintNFTRequest({ ...body, chain: Currency.ONE })

/**
 * Deploy new NFT smart contract, which will be used for later minting.
 * @param body body of the mint request
 * @param provider optional provider do broadcast tx
 */
export const deployNFT = async (body: ChainDeployErc721, provider?: string): Promise<TransactionHash> => {
  return sendOneDeploy721SignedTransaction(body, provider)
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
  body: ChainMintErc721,
  file: Buffer,
  name: string,
  description?: string,
  scheme?: any,
  provider?: string
) => {
  return await createNFTAbstraction(mintNFTWithUri, testnet, { ...body, chain: Currency.ONE }, file, name, description, scheme, provider)
}

/**
 * Mint new NFT token.
 * @param body body of the mint request
 * @param options
 * @param options.provider optional provider do broadcast tx
 */
export const mintNFTWithUri = async (body: ChainMintErc721, options?: { provider?: string }): Promise<TransactionHash> => {
  if (body.authorAddresses) {
    return sendOneMintCashback721SignedTransaction(body, options?.provider)
  } else {
    return sendOneMint721SignedTransaction(body, options?.provider)
  }
}

/**
 * Mint multiple new NFT tokens.
 * @param body body of the mint request
 * @param provider optional provider do broadcast tx
 */
export const mintMultipleNFTWithUri = async (body: ChainMintMultipleErc721, provider?: string) => {
  if (body.authorAddresses) {
    return sendOneMintMultipleCashback721SignedTransaction(body, provider)
  } else {
    return sendOneMintMultiple721SignedTransaction(body, provider)
  }
}

/**
 * Burn new NFT token. Token will no longer exists.
 * @param body body of the mint request
 * @param provider optional provider do broadcast tx
 */
export const burnNFT = async (body: ChainBurnErc721, provider?: string) => {
  return sendOneBurn721SignedTransaction(body, provider)
}

/**
 * Update royalty cashback as author of the NFT token.
 * @param body body of the mint request
 * @param provider optional provider do broadcast tx
 */
export const updateCashbackForAuthorNFT = async (body: ChainUpdateCashbackErc721, provider?: string) => {
  return sendOneUpdateCashbackForAuthor721SignedTransaction(body, provider)
}

/**
 * Transfer new NFT token to new recipient.
 * @param body body of the mint request
 * @param provider optional provider do broadcast tx
 */
export const transferNFT = async (body: ChainTransferErc721, provider?: string) => {
  return sendOneTransfer721SignedTransaction(body, provider)
}

/**
 * Prepare add new minter to the NFT contract transaction.
 * @param body body of the add minter request
 * @param provider optional provider do broadcast tx
 */
export const prepareAddNFTMinter = async (body: ChainAddMinter, provider?: string) => {
  const params = await prepareAddNFTMinterAbstraction({ ...body, chain: Currency.ONE })
  return await helperPrepareSCCall(body, 'grantRole', params, provider, erc721TokenABI)
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
  return getNFTTransactionsByAddressDefi(Currency.ONE, address, tokenAddress, pageSize, offset, from, to, sort)
}
export const getNFTsByAddress = async (contractAddress: string, address: string) => {
  return getNFTsByAddressDefi(Currency.ONE, contractAddress, address)
}
export const getNFTProvenanceData = async (contractAddress: string, tokenId: string) => {
  return getNFTProvenanceDataDefi(Currency.ONE, contractAddress, tokenId)
}
export const getNFTContractAddress = async (txId: string) => {
  return getNFTContractAddressDefi(Currency.ONE, txId)
}
export const getNFTMetadataURI = async (contractAddress: string, tokenId: string, account?: string) => {
  return getNFTMetadataURIDefi(Currency.ONE, contractAddress, tokenId, account)
}
export const getNFTImage = async (contractAddress: string, tokenId: string, account?: string) => {
  return getNFTImageDefi(Currency.ONE, contractAddress, tokenId, account)
}
export const getNFTRoyalty = async (contractAddress: string, tokenId: string) => {
  return getNFTRoyaltyDefi(Currency.ONE, contractAddress, tokenId)
}
