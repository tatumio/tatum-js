import { mintNFTRequest, createNFTAbstraction, prepareAddNFTMinterAbstraction } from '@tatumio/tatum-defi'
import { AddMinter, MintErc721, TransactionHash, erc721TokenABI } from '@tatumio/tatum-core'
import {
  CeloDeployErc721,
  sendDeployErc721Transaction,
  CeloMintErc721,
  sendMintCashbackErc721Transaction,
  sendMintErc721Transaction,
  CeloMintMultipleErc721,
  sendMintMultipleCashbackErc721Transaction,
  sendMintMultipleErc721Transaction,
  CeloBurnErc721,
  sendBurnErc721Transaction,
  CeloUpdateCashbackErc721,
  sendUpdateCashbackForAuthorErc721Transaction,
  CeloTransferErc721,
  sendTransferErc721Transaction,
  helperPrepareSCCall,
  helperBroadcastTx,
} from '..'

export const mintNFT = (body: MintErc721): Promise<TransactionHash> => mintNFTRequest(body)

/**
 * Deploy new NFT smart contract, which will be used for later minting.
 * @param testnet if we use testnet or not
 * @param body body of the mint request
 * @param provider optional provider do broadcast tx
 */
export const deployNFT = async (testnet: boolean, body: CeloDeployErc721, provider?: string): Promise<TransactionHash> => {
  return sendDeployErc721Transaction(testnet, body, provider)
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
    return sendMintCashbackErc721Transaction(!!options?.testnet, body, options?.provider)
  } else {
    return sendMintErc721Transaction(!!options?.testnet, body, options?.provider)
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
    return sendMintMultipleCashbackErc721Transaction(testnet, body, provider)
  } else {
    return sendMintMultipleErc721Transaction(testnet, body, provider)
  }
}

/**
 * Burn new NFT token. Token will no longer exists.
 * @param testnet if we use testnet or not
 * @param body body of the mint request
 * @param provider optional provider do broadcast tx
 */
export const burnNFT = async (testnet: boolean, body: CeloBurnErc721, provider?: string) => {
  return sendBurnErc721Transaction(testnet, body, provider)
}

/**
 * Update royalty cashback as author of the NFT token.
 * @param testnet if we use testnet or not
 * @param body body of the mint request
 * @param provider optional provider do broadcast tx
 */
export const updateCashbackForAuthorNFT = async (testnet: boolean, body: CeloUpdateCashbackErc721, provider?: string) => {
  return sendUpdateCashbackForAuthorErc721Transaction(testnet, body, provider)
}

/**
 * Transfer new NFT token to new recipient.
 * @param testnet if we use testnet or not
 * @param body body of the mint request
 * @param provider optional provider do broadcast tx
 */
export const transferNFT = async (testnet: boolean, body: CeloTransferErc721, provider?: string) => {
  return sendTransferErc721Transaction(testnet, body, provider)
}

/**
 * Prepare add new minter to the NFT contract transaction.
 * @param testnet if we use testnet or not
 * @param body body of the add minter request
 * @param provider optional provider do broadcast tx
 */
export const prepareAddNFTMinter = async (testnet: boolean, body: AddMinter, provider?: string) => {
  const params = await prepareAddNFTMinterAbstraction(body)
  return await helperPrepareSCCall(testnet, body, 'grantRole', params, provider, erc721TokenABI)
}

/**
 * Add new minter to the NFT contract.
 * @param testnet if we use testnet or not
 * @param body body of the add minter request
 * @param provider optional provider do broadcast tx
 */
export const sendAddNFTMinter = async (testnet: boolean, body: AddMinter, provider?: string) =>
  helperBroadcastTx(await prepareAddNFTMinter(testnet, body, provider), body.signatureId)

export {
  getNFTTransactionsByAddress,
  getNFTsByAddress,
  getNFTProvenanceData,
  getNFTContractAddress,
  getNFTMetadataURI,
  getNFTImage,
  getNFTRoyalty,
} from '@tatumio/tatum-defi'
