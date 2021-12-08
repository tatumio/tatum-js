import {
  NftTransaction,
  mintNFTRequest,
  createNFTAbstraction,
  prepareAddNFTMinterAbstraction,
  getNFTTransactionsByToken as getNFTTransactionsByTokenDefi,
  getNFTTransactionsByAddress as getNFTTransactionsByAddressDefi,
  getNFTsByAddress as getNFTsByAddressDefi,
  getNFTProvenanceData as getNFTProvenanceDataDefi,
  getNFTContractAddress as getNFTContractAddressDefi,
  getNFTMetadataURI as getNFTMetadataURIDefi,
  getNFTImage as getNFTImageDefi,
  getNFTRoyalty as getNFTRoyaltyDefi,
} from '@tatumio/tatum-defi'
import { TransactionHash, erc721TokenABI, ChainMintErc721, ChainAddMinter, Currency, Sort } from '@tatumio/tatum-core'
import {
  CeloDeployErc721,
  sendCeloDeployErc721Transaction,
  CeloMintErc721,
  sendCeloMintCashbackErc721Transaction,
  sendCeloMintErc721Transaction,
  CeloMintMultipleErc721,
  sendCeloMintMultipleCashbackErc721Transaction,
  sendCeloMintMultipleErc721Transaction,
  CeloBurnErc721,
  sendCeloBurnErc721Transaction,
  CeloUpdateCashbackErc721,
  sendCeloUpdateCashbackForAuthorErc721Transaction,
  CeloTransferErc721,
  sendCeloTransferErc721Transaction,
  helperPrepareSCCall,
  helperBroadcastTx,
} from '..'

export const mintNFT = (body: ChainMintErc721): Promise<TransactionHash> => mintNFTRequest({ ...body, chain: Currency.CELO })

/**
 * Deploy new NFT smart contract, which will be used for later minting.
 * @param testnet if we use testnet or not
 * @param body body of the mint request
 * @param provider optional provider do broadcast tx
 */
export const deployNFT = async (testnet: boolean, body: CeloDeployErc721, provider?: string): Promise<TransactionHash> => {
  return sendCeloDeployErc721Transaction(testnet, body, provider)
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
  body: CeloMintErc721,
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
 * @param options.testnet optional if we use testnet or not
 * @param options.provider optional provider do broadcast tx
 */
export const mintNFTWithUri = async (
  body: CeloMintErc721,
  options?: { testnet?: boolean; provider?: string }
): Promise<TransactionHash> => {
  if (body.authorAddresses) {
    return sendCeloMintCashbackErc721Transaction(!!options?.testnet, body, options?.provider)
  } else {
    return sendCeloMintErc721Transaction(!!options?.testnet, body, options?.provider)
  }
}

/**
 * Mint multiple new NFT tokens.
 * @param testnet if we use testnet or not
 * @param body body of the mint request
 * @param provider optional provider do broadcast tx
 */
export const mintMultipleNFTWithUri = async (testnet: boolean, body: CeloMintMultipleErc721, provider?: string) => {
  if (body.authorAddresses) {
    return sendCeloMintMultipleCashbackErc721Transaction(testnet, body, provider)
  } else {
    return sendCeloMintMultipleErc721Transaction(testnet, body, provider)
  }
}

/**
 * Burn new NFT token. Token will no longer exists.
 * @param testnet if we use testnet or not
 * @param body body of the mint request
 * @param provider optional provider do broadcast tx
 */
export const burnNFT = async (testnet: boolean, body: CeloBurnErc721, provider?: string) => {
  return sendCeloBurnErc721Transaction(testnet, body, provider)
}

/**
 * Update royalty cashback as author of the NFT token.
 * @param testnet if we use testnet or not
 * @param body body of the mint request
 * @param provider optional provider do broadcast tx
 */
export const updateCashbackForAuthorNFT = async (testnet: boolean, body: CeloUpdateCashbackErc721, provider?: string) => {
  return sendCeloUpdateCashbackForAuthorErc721Transaction(testnet, body, provider)
}

/**
 * Transfer new NFT token to new recipient.
 * @param testnet if we use testnet or not
 * @param body body of the mint request
 * @param provider optional provider do broadcast tx
 */
export const transferNFT = async (testnet: boolean, body: CeloTransferErc721, provider?: string) => {
  return sendCeloTransferErc721Transaction(testnet, body, provider)
}

/**
 * Prepare add new minter to the NFT contract transaction.
 * @param testnet if we use testnet or not
 * @param body body of the add minter request
 * @param provider optional provider do broadcast tx
 */
export const prepareAddNFTMinter = async (testnet: boolean, body: ChainAddMinter, provider?: string) => {
  const params = await prepareAddNFTMinterAbstraction({ ...body, chain: Currency.CELO })
  return await helperPrepareSCCall(testnet, body, 'grantRole', params, provider, erc721TokenABI)
}

/**
 * Add new minter to the NFT contract.
 * @param testnet if we use testnet or not
 * @param body body of the add minter request
 * @param provider optional provider do broadcast tx
 */
export const sendAddNFTMinter = async (testnet: boolean, body: ChainAddMinter, provider?: string) =>
  helperBroadcastTx(await prepareAddNFTMinter(testnet, body, provider), body.signatureId)

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
): Promise<NftTransaction[]> => getNFTTransactionsByTokenDefi(Currency.CELO, tokenId, tokenAddress, pageSize, offset, from, to, sort)

/**
 * Get NFT transactions by address. This includes incoming and outgoing transactions for the address.
 * @param address Account address
 * @param tokenAddress NFT Token address
 * @param pageSize Max number of items per page is 50.
 * @param offset optional Offset to obtain next page of the data.
 * @param from optional Transactions from this block onwords will be included.
 * @param to optional Transactions up to this block will be included.
 * @param sort optional Sorting of the data. ASC - oldest first, DESC - newest first.
 * For more details, see <a href="https://tatum.io/apidoc.php#operation/NftGetTransactionByAddress" target="_blank">Tatum API documentation</a>
 */
export const getNFTTransactionsByAddress = async (
  address: string,
  tokenAddress: string,
  pageSize: number,
  offset?: number,
  from?: number,
  to?: number,
  sort?: Sort
): Promise<NftTransaction[]> => getNFTTransactionsByAddressDefi(Currency.CELO, address, tokenAddress, pageSize, offset, from, to, sort)

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/NftGetBalanceErc721" target="_blank">Tatum API documentation</a>
 */
export const getNFTsByAddress = async (contractAddress: string, address: string) => {
  return getNFTsByAddressDefi(Currency.CELO, contractAddress, address)
}

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/NftProvenanceReadData" target="_blank">Tatum API documentation</a>
 */
export const getNFTProvenanceData = async (contractAddress: string, tokenId: string) => {
  return getNFTProvenanceDataDefi(Currency.CELO, contractAddress, tokenId)
}

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/NftGetContractAddress" target="_blank">Tatum API documentation</a>
 */
export const getNFTContractAddress = async (txId: string) => {
  return getNFTContractAddressDefi(Currency.CELO, txId)
}

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/NftGetMetadataErc721" target="_blank">Tatum API documentation</a>
 */
export const getNFTMetadataURI = async (contractAddress: string, tokenId: string, account?: string) => {
  return getNFTMetadataURIDefi(Currency.CELO, contractAddress, tokenId, account)
}

/**
 * Get IPFS image URL from the NFT with the IPFS Metadata scheme. URL
 * @param contractAddress contract address of the NFT token
 * @param tokenId ID of the token
 * @param account FLOW only - account where the token is minted
 */
export const getNFTImage = async (contractAddress: string, tokenId: string, account?: string) => {
  return getNFTImageDefi(Currency.CELO, contractAddress, tokenId, account)
}

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/NftGetRoyaltyErc721" target="_blank">Tatum API documentation</a>
 */
export const getNFTRoyalty = async (contractAddress: string, tokenId: string) => {
  return getNFTRoyaltyDefi(Currency.CELO, contractAddress, tokenId)
}
