import {
  mintNFTRequest,
  getNFTTransaction as getNFTTransactionDefi,
  createNFTAbstraction,
  prepareAddNFTMinterAbstraction,
  getNFTTransactionsByAddress as getNFTTransactionsByAddressDefi,
  NftTransaction,
} from '@tatumio/tatum-defi'
import {
  MintErc721,
  DeployErc721,
  MintMultipleErc721,
  BurnErc721,
  TransferErc721,
  TransactionHash,
  UpdateCashbackErc721,
  AddMinter,
  erc721TokenABI,
  Currency,
  Sort,
} from '@tatumio/tatum-core'
import {
  sendPolygonBurnErc721SignedTransaction,
  sendPolygonDeployErc721SignedTransaction,
  sendPolygonMintCashbackErc721SignedTransaction,
  sendPolygonMintErc721SignedTransaction,
  sendPolygonMintMultipleCashbackErc721SignedTransaction,
  sendPolygonMintMultipleErc721SignedTransaction,
  sendPolygonTransferErc721SignedTransaction,
  sendPolygonUpdateCashbackForAuthorErc721SignedTransaction,
} from '../transaction'
import { helperBroadcastTx, helperPrepareSCCall } from '../helpers'
import { MaticTx } from '../model'

export const mintNFT = (body: MintErc721): Promise<TransactionHash> => mintNFTRequest(body)

/**
 * Deploy new NFT smart contract, which will be used for later minting.
 * @param body body of the mint request
 * @param provider optional provider do broadcast tx
 */
export const deployNFT = async (body: DeployErc721, provider?: string): Promise<TransactionHash> => {
  return sendPolygonDeployErc721SignedTransaction(body as DeployErc721, provider)
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
  if ((body as MintErc721).authorAddresses) {
    return sendPolygonMintCashbackErc721SignedTransaction(body as MintErc721, options?.provider)
  } else {
    return sendPolygonMintErc721SignedTransaction(body as MintErc721, options?.provider)
  }
}

/**
 * Mint multiple new NFT tokens.
 * @param body body of the mint request
 * @param provider optional provider do broadcast tx
 */
export const mintMultipleNFTWithUri = async (body: MintMultipleErc721, provider?: string) => {
  if ((body as MintMultipleErc721).authorAddresses) {
    return sendPolygonMintMultipleCashbackErc721SignedTransaction(body as MintMultipleErc721, provider)
  } else {
    return sendPolygonMintMultipleErc721SignedTransaction(body as MintMultipleErc721, provider)
  }
}

/**
 * Burn new NFT token. Token will no longer exists.
 * @param body body of the mint request
 * @param provider optional provider do broadcast tx
 */
export const burnNFT = async (body: BurnErc721, provider?: string) => {
  return sendPolygonBurnErc721SignedTransaction(body, provider)
}

/**
 * Update royalty cashback as author of the NFT token.
 * @param body body of the mint request
 * @param provider optional provider do broadcast tx
 */
export const updateCashbackForAuthorNFT = async (body: UpdateCashbackErc721, provider?: string) => {
  return sendPolygonUpdateCashbackForAuthorErc721SignedTransaction(body, provider)
}

/**
 * Transfer new NFT token to new recipient.
 * @param body body of the mint request
 * @param provider optional provider do broadcast tx
 */
export const transferNFT = async (body: TransferErc721, provider?: string) => {
  return sendPolygonTransferErc721SignedTransaction(body, provider)
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
): Promise<NftTransaction[]> => getNFTTransactionsByAddressDefi(Currency.MATIC, address, tokenAddress, pageSize, offset, from, to, sort)

export const getNFTTransaction = async (hash: string): Promise<MaticTx> => getNFTTransactionDefi<MaticTx>(Currency.MATIC, hash)

export {
  getNFTsByAddress,
  getNFTProvenanceData,
  getNFTContractAddress,
  getNFTMetadataURI,
  getNFTImage,
  getNFTRoyalty,
} from '@tatumio/tatum-defi'
