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
  ChainAddMinter,
  ChainBurnErc721,
  ChainDeployErc721,
  ChainMintErc721,
  ChainMintMultipleErc721,
  ChainTransferErc721,
  ChainUpdateCashbackErc721,
  Currency,
  erc721TokenABI,
  Sort,
  TransactionHash,
} from '@tatumio/tatum-core'
import {
  helperBroadcastTx,
  helperPrepareSCCall,
  sendBep721Transaction,
  sendBurnBep721Transaction,
  sendDeployBep721Transaction,
  sendMintBep721Transaction,
  sendMintBepCashback721Transaction,
  sendMintMultipleBep721Transaction,
  sendMintMultipleCashbackBep721Transaction,
  sendUpdateCashbackForAuthorBep721Transaction,
} from '../'

export const getNFTTransactionsByAddress = async (
  address: string,
  tokenAddress: string,
  pageSize = 50,
  offset = 0,
  from?: string,
  to?: string,
  sort?: Sort
) => {
  return getNFTTransactionsByAddressDefi(Currency.BSC, address, tokenAddress, pageSize, offset, from, to, sort)
}
export const getNFTsByAddress = async (contractAddress: string, address: string) => {
  return getNFTsByAddressDefi(Currency.BSC, contractAddress, address)
}
export const getNFTProvenanceData = async (contractAddress: string, tokenId: string) => {
  return getNFTProvenanceDataDefi(Currency.BSC, contractAddress, tokenId)
}
export const getNFTContractAddress = async (txId: string) => {
  return getNFTContractAddressDefi(Currency.BSC, txId)
}
export const getNFTMetadataURI = async (contractAddress: string, tokenId: string, account?: string) => {
  return getNFTMetadataURIDefi(Currency.BSC, contractAddress, tokenId, account)
}
export const getNFTImage = async (contractAddress: string, tokenId: string, account?: string) => {
  return getNFTImageDefi(Currency.BSC, contractAddress, tokenId, account)
}
export const getNFTRoyalty = async (contractAddress: string, tokenId: string) => {
  return getNFTRoyaltyDefi(Currency.BSC, contractAddress, tokenId)
}

export const mintNFT = (body: ChainMintErc721): Promise<TransactionHash> => mintNFTRequest({ ...body, chain: Currency.BSC })

/**
 * Deploy new NFT smart contract, which will be used for later minting.
 * @param body body of the mint request
 * @param provider optional provider do broadcast tx
 */
export const deployNFT = async (body: ChainDeployErc721, provider?: string): Promise<TransactionHash> => {
  return sendDeployBep721Transaction(body, provider)
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
  return await createNFTAbstraction(mintNFTWithUri, testnet, { ...body, chain: Currency.BSC }, file, name, description, scheme, provider)
}

/**
 * Mint new NFT token.
 * @param body body of the mint request
 * @param options
 * @param options.provider optional provider do broadcast tx
 */
export const mintNFTWithUri = async (body: ChainMintErc721, options?: { provider?: string }): Promise<TransactionHash> => {
  if (body.authorAddresses) {
    return sendMintBepCashback721Transaction(body, options?.provider)
  }

  return sendMintBep721Transaction(body, options?.provider)
}

/**
 * Mint multiple new NFT tokens.
 * @param body body of the mint request
 * @param provider optional provider do broadcast tx
 */
export const mintMultipleNFTWithUri = async (body: ChainMintMultipleErc721, provider?: string) => {
  if (body.authorAddresses) {
    return sendMintMultipleCashbackBep721Transaction(body, provider)
  } else {
    return sendMintMultipleBep721Transaction(body, provider)
  }
}

/**
 * Burn new NFT token. Token will no longer exists.
 * @param body body of the mint request
 * @param provider optional provider do broadcast tx
 */
export const burnNFT = async (body: ChainBurnErc721, provider?: string) => {
  return sendBurnBep721Transaction(body, provider)
}

/**
 * Update royalty cashback as author of the NFT token.
 * @param body body of the mint request
 * @param provider optional provider do broadcast tx
 */
export const updateCashbackForAuthorNFT = async (body: ChainUpdateCashbackErc721, provider?: string) => {
  return sendUpdateCashbackForAuthorBep721Transaction(body, provider)
}

/**
 * Transfer new NFT token to new recipient.
 * @param body body of the mint request
 * @param provider optional provider do broadcast tx
 */
export const transferNFT = async (body: ChainTransferErc721, provider?: string) => {
  return sendBep721Transaction(body, provider)
}

/**
 * Prepare add new minter to the NFT contract transaction.
 * @param body body of the add minter request
 * @param provider optional provider do broadcast tx
 */
export const prepareAddNFTMinter = async (body: ChainAddMinter, provider?: string) => {
  const params = await prepareAddNFTMinterAbstraction({ ...body, chain: Currency.BSC })
  return await helperPrepareSCCall(body, 'grantRole', params, provider, erc721TokenABI)
}

/**
 * Add new minter to the NFT contract.
 * @param body body of the add minter request
 * @param provider optional provider do broadcast tx
 */
export const sendAddNFTMinter = async (body: ChainAddMinter, provider?: string) =>
  helperBroadcastTx(await prepareAddNFTMinter(body, provider), body.signatureId)
