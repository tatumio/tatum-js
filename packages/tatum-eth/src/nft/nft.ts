import {
  createNFTAbstraction,
  getNFTTransaction as getNFTTransactionDefi,
  getNFTTransactionsByToken as getNFTTransactionsByTokenDefi,
  getNFTTransactionsByAddress as getNFTTransactionsByAddressDefi,
  prepareAddNFTMinterAbstraction,
  NftTransaction,
  mintNFTRequest,
} from '@tatumio/tatum-defi'
import {
  Currency,
  TransactionHash,
  UpdateCashbackErc721,
  BurnErc721,
  DeployErc721,
  MintErc721,
  MintMultipleErc721,
  TransferErc721,
  AddMinter,
  erc721TokenABI,
  Sort,
} from '@tatumio/tatum-core'
import {
  sendBurnErc721Transaction,
  sendDeployErc721Transaction,
  sendErc721Transaction,
  sendEthMintMultipleCashbackErc721SignedTransaction,
  sendMintCashbackErc721Transaction,
  sendMintErc721Transaction,
  sendMintMultipleErc721Transaction,
  sendUpdateCashbackForAuthorErc721Transaction,
} from '../transaction'
import { helperBroadcastTx, helperPrepareSCCall } from '../helpers'
import { ETHTx } from '../model'

export const mintNFT = (body: MintErc721): Promise<TransactionHash> => mintNFTRequest(body)

/**
 * Deploy new NFT smart contract, which will be used for later minting.
 * @param body body of the mint request
 * @param provider optional provider do broadcast tx
 */
export const deployNFT = async (body: DeployErc721 & { chain: Currency.ETH }, provider?: string): Promise<TransactionHash> => {
  return sendDeployErc721Transaction(body as DeployErc721, provider)
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
export const createNFT = async (body: MintErc721, file: Buffer, name: string, description?: string, scheme?: any, provider?: string) => {
  return await createNFTAbstraction(mintNFTWithUri, false, body, file, name, description, scheme, provider)
}

/**
 * Mint new NFT token.
 * @param body body of the mint request
 * @param options
 * @param options.provider optional provider do broadcast tx
 */
export const mintNFTWithUri = async (body: MintErc721, options?: { provider?: string }) => {
  if ((body as MintErc721).authorAddresses) {
    return sendMintCashbackErc721Transaction(body as MintErc721, options?.provider)
  } else {
    return sendMintErc721Transaction(body as MintErc721, options?.provider)
  }
}

/**
 * Mint multiple new NFT tokens.
 * @param body body of the mint request
 * @param provider optional provider do broadcast tx
 */
export const mintMultipleNFTWithUri = async (body: MintMultipleErc721, provider?: string) => {
  if ((body as MintMultipleErc721).authorAddresses) {
    return sendEthMintMultipleCashbackErc721SignedTransaction(body as MintMultipleErc721, provider)
  } else {
    return sendMintMultipleErc721Transaction(body as MintMultipleErc721, provider)
  }
}

/**
 * Burn new NFT token. Token will no longer exists.
 * @param body body of the mint request
 * @param provider optional provider do broadcast tx
 */
export const burnNFT = async (body: BurnErc721, provider?: string) => {
  return sendBurnErc721Transaction(body, provider)
}

/**
 * Update royalty cashback as author of the NFT token.
 * @param body body of the mint request
 * @param provider optional provider do broadcast tx
 */
export const updateCashbackForAuthorNFT = async (body: UpdateCashbackErc721, provider?: string) => {
  return sendUpdateCashbackForAuthorErc721Transaction(body, provider)
}

/**
 * Transfer new NFT token to new recipient.
 * @param body body of the mint request
 * @param provider optional provider do broadcast tx
 */
export const transferNFT = async (body: TransferErc721, provider?: string) => {
  return sendErc721Transaction(body, provider)
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
  helperBroadcastTx((await prepareAddNFTMinter(body, provider)) as string, body.signatureId as string)

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
): Promise<NftTransaction[]> => getNFTTransactionsByTokenDefi(Currency.ETH, tokenId, tokenAddress, pageSize, offset, from, to, sort)

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
): Promise<NftTransaction[]> => getNFTTransactionsByAddressDefi(Currency.ETH, address, tokenAddress, pageSize, offset, from, to, sort)

/**
 * Get NFT transaction by transaction hash.
 * @param hash Transaction hash
 */
export const getNFTTransaction = async (hash: string): Promise<ETHTx> => getNFTTransactionDefi<ETHTx>(Currency.ETH, hash)

export {
  getNFTsByAddress,
  getNFTProvenanceData,
  getNFTContractAddress,
  getNFTMetadataURI,
  getNFTImage,
  getNFTRoyalty,
} from '@tatumio/tatum-defi'
