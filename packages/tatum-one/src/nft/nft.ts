import {
  createNFTAbstraction,
  getNFTContractAddress as getNFTContractAddressDefi,
  getNFTImage as getNFTImageDefi,
  getNFTMetadataURI as getNFTMetadataURIDefi,
  getNFTProvenanceData as getNFTProvenanceDataDefi,
  getNFTRoyalty as getNFTRoyaltyDefi,
  getNFTsByAddress as getNFTsByAddressDefi,
  mintNFTRequest,
  prepareAddNFTMinterAbstraction,
  getNFTTransaction as getNFTTransactionDefi,
  getNFTTransactionsByToken as getNFTTransactionsByTokenDefi,
  getNFTTransactionsByAddress as getNFTTransactionsByAddressDefi,
  NftTransaction,
  ChainOneMint721,
} from '@tatumio/tatum-core'
import {
  TransactionHash,
  erc721TokenABI,
  Currency,
  Sort,
  ChainDeployErc721,
  ChainMintErc721,
  ChainMintMultipleErc721,
  ChainBurnErc721,
  ChainUpdateCashbackErc721,
  ChainTransferErc721,
  ChainAddMinter,
} from '@tatumio/tatum-core'
import {
  sendBurn721SignedTransaction,
  sendDeploy721SignedTransaction,
  sendMint721SignedTransaction,
  sendMintCashback721SignedTransaction,
  sendMintMultiple721SignedTransaction,
  sendMintMultipleCashback721SignedTransaction,
  sendTransfer721SignedTransaction,
  sendUpdateCashbackForAuthor721SignedTransaction,
} from '../transaction'
import { helperBroadcastTx, helperPrepareSCCall } from '../helpers'
import { OneTx } from '../model'

export const mintNFT = (body: ChainOneMint721): Promise<TransactionHash> => mintNFTRequest({ ...body, chain: Currency.ONE })

/**
 * Deploy new NFT smart contract, which will be used for later minting.
 * @param body body of the mint request
 * @param provider optional provider do broadcast tx
 */
export const deployNFT = async (body: ChainDeployErc721, provider?: string): Promise<TransactionHash> => {
  return sendDeploy721SignedTransaction(body, provider)
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
    return sendMintCashback721SignedTransaction(body, options?.provider)
  } else {
    return sendMint721SignedTransaction(body, options?.provider)
  }
}

/**
 * Mint multiple new NFT tokens.
 * @param body body of the mint request
 * @param provider optional provider do broadcast tx
 */
export const mintMultipleNFTWithUri = async (body: ChainMintMultipleErc721, provider?: string) => {
  if (body.authorAddresses) {
    return sendMintMultipleCashback721SignedTransaction(body, provider)
  } else {
    return sendMintMultiple721SignedTransaction(body, provider)
  }
}

/**
 * Burn new NFT token. Token will no longer exists.
 * @param body body of the mint request
 * @param provider optional provider do broadcast tx
 */
export const burnNFT = async (body: ChainBurnErc721, provider?: string) => {
  return sendBurn721SignedTransaction(body, provider)
}

/**
 * Update royalty cashback as author of the NFT token.
 * @param body body of the mint request
 * @param provider optional provider do broadcast tx
 */
export const updateCashbackForAuthorNFT = async (body: ChainUpdateCashbackErc721, provider?: string) => {
  return sendUpdateCashbackForAuthor721SignedTransaction(body, provider)
}

/**
 * Transfer new NFT token to new recipient.
 * @param body body of the mint request
 * @param provider optional provider do broadcast tx
 */
export const transferNFT = async (body: ChainTransferErc721, provider?: string) => {
  return sendTransfer721SignedTransaction(body, provider)
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

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/NftGetBalanceErc721" target="_blank">Tatum API documentation</a>
 */
export const getNFTsByAddress = async (contractAddress: string, address: string) => {
  return getNFTsByAddressDefi(Currency.ONE, contractAddress, address)
}

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/NftProvenanceReadData" target="_blank">Tatum API documentation</a>
 */
export const getNFTProvenanceData = async (contractAddress: string, tokenId: string) => {
  return getNFTProvenanceDataDefi(Currency.ONE, contractAddress, tokenId)
}

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/NftGetContractAddress" target="_blank">Tatum API documentation</a>
 */
export const getNFTContractAddress = async (txId: string) => {
  return getNFTContractAddressDefi(Currency.ONE, txId)
}

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/NftGetMetadataErc721" target="_blank">Tatum API documentation</a>
 */
export const getNFTMetadataURI = async (contractAddress: string, tokenId: string, account?: string) => {
  return getNFTMetadataURIDefi(Currency.ONE, contractAddress, tokenId, account)
}

/**
 * Get IPFS image URL from the NFT with the IPFS Metadata scheme. URL
 * @param contractAddress contract address of the NFT token
 * @param tokenId ID of the token
 * @param account FLOW only - account where the token is minted
 */
export const getNFTImage = async (contractAddress: string, tokenId: string, account?: string) => {
  return getNFTImageDefi(Currency.ONE, contractAddress, tokenId, account)
}

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/NftGetRoyaltyErc721" target="_blank">Tatum API documentation</a>
 */
export const getNFTRoyalty = async (contractAddress: string, tokenId: string) => {
  return getNFTRoyaltyDefi(Currency.ONE, contractAddress, tokenId)
}