import {
  createNFTAbstraction,
  mintNFTRequest,
  prepareAddNFTMinterAbstraction,
  getNFTTransaction as getNFTTransactionDefi,
  getNFTTransactionsByToken as getNFTTransactionsByTokenDefi,
  getNFTTransactionsByAddress as getNFTTransactionsByAddressDefi,
  NftTransaction,
} from '@tatumio/tatum-defi'
import {
  AddMinter,
  BurnErc721,
  DeployErc721,
  MintErc721,
  MintMultipleErc721,
  TransactionHash,
  TransferErc721,
  UpdateCashbackErc721,
  erc721TokenABI,
  Currency,
  Sort,
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
import { helperBroadcastTx, helperPrepareSCCall } from '../helpers'
import { OneTx } from '../model'

export const mintNFT = (body: OneMint721): Promise<TransactionHash> => mintNFTRequest(body)

/**
 * Deploy new NFT smart contract, which will be used for later minting.
 * @param body body of the mint request
 * @param provider optional provider do broadcast tx
 */
export const deployNFT = async (body: DeployErc721, provider?: string): Promise<TransactionHash> => {
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
 * @param options
 * @param options.provider optional provider do broadcast tx
 */
export const mintNFTWithUri = async (body: MintErc721, options?: { provider?: string }): Promise<TransactionHash> => {
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
export const mintMultipleNFTWithUri = async (body: MintMultipleErc721, provider?: string) => {
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
export const burnNFT = async (body: BurnErc721, provider?: string) => {
  return sendOneBurn721SignedTransaction(body, provider)
}

/**
 * Update royalty cashback as author of the NFT token.
 * @param body body of the mint request
 * @param provider optional provider do broadcast tx
 */
export const updateCashbackForAuthorNFT = async (body: UpdateCashbackErc721, provider?: string) => {
  return sendOneUpdateCashbackForAuthor721SignedTransaction(body, provider)
}

/**
 * Transfer new NFT token to new recipient.
 * @param body body of the mint request
 * @param provider optional provider do broadcast tx
 */
export const transferNFT = async (body: TransferErc721, provider?: string) => {
  return sendOneTransfer721SignedTransaction(body, provider)
}

/**
 * Prepare add new minter to the NFT contract transaction.
 * @param body body of the add minter request
 * @param provider optional provider do broadcast tx
 */
export const prepareAddNFTMinter = async (body: AddMinter, provider?: string) => {
  const params = await prepareAddNFTMinterAbstraction(body)
  return await helperPrepareSCCall(body, 'grantRole', params, provider, erc721TokenABI)
}

/**
 * Add new minter to the NFT contract.
 * @param body body of the add minter request
 * @param provider optional provider do broadcast tx
 */
export const sendAddNFTMinter = async (body: AddMinter, provider?: string) =>
  helperBroadcastTx(await prepareAddNFTMinter(body, provider), body.signatureId)

/**
 * Get NFT transactions by token. This includes incoming and outgoing transactions for the token.
 * @param tokenId NFT Token ID
 * @param tokenAddress NFT Token address
 * @param pageSize Max number of items per page is 50.
 * @param offset optional Offset to obtain next page of the data.
 * @param from optional Transactions from this block onwords will be included.
 * @param to optional Transactions up to this block will be included.
 * @param sort optional Sorting of the data. ASC - oldest first, DESC - newest first.
 */
export const getNFTTransactionsByToken = async (
  tokenId: number,
  tokenAddress: string,
  pageSize: number,
  offset?: number,
  from?: number,
  to?: number,
  sort?: Sort
): Promise<NftTransaction[]> => getNFTTransactionsByTokenDefi(Currency.ONE, tokenId, tokenAddress, pageSize, offset, from, to, sort)

/**
 * Get NFT transactions by address. This includes incoming and outgoing transactions for the address.
 * @param address Account address
 * @param tokenAddress NFT Token address
 * @param pageSize Max number of items per page is 50.
 * @param offset optional Offset to obtain next page of the data.
 * @param from optional Transactions from this block onwords will be included.
 * @param to optional Transactions up to this block will be included.
 * @param sort optional Sorting of the data. ASC - oldest first, DESC - newest first.
 */
export const getNFTTransactionsByAddress = async (
  address: string,
  tokenAddress: string,
  pageSize: number,
  offset?: number,
  from?: number,
  to?: number,
  sort?: Sort
): Promise<NftTransaction[]> => getNFTTransactionsByAddressDefi(Currency.ONE, address, tokenAddress, pageSize, offset, from, to, sort)

/**
 * Get NFT transaction by transaction hash.
 * @param hash Transaction hash
 */
export const getNFTTransaction = async (hash: string): Promise<OneTx> => getNFTTransactionDefi<OneTx>(Currency.ONE, hash)

export {
  getNFTsByAddress,
  getNFTProvenanceData,
  getNFTContractAddress,
  getNFTMetadataURI,
  getNFTImage,
  getNFTRoyalty,
} from '@tatumio/tatum-defi'
