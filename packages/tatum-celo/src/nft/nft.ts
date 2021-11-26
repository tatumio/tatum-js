import { mintNFTRequest, createNFTAbstraction, prepareAddNFTMinterAbstraction } from '@tatumio/tatum-defi'
import { AddMinter, MintErc721, TransactionHash, erc721TokenABI } from '@tatumio/tatum-core'
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

export const mintNFT = (body: MintErc721): Promise<TransactionHash> => mintNFTRequest(body)

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
  return await createNFTAbstraction(() => mintNFTWithUri(testnet, body, provider), testnet, body, file, name, description, scheme, provider)
}

/**
 * Mint new NFT token.
 * @param testnet if we use testnet or not
 * @param body body of the mint request
 * @param provider optional provider do broadcast tx
 */
export const mintNFTWithUri = async (testnet: boolean, body: CeloMintErc721, provider?: string): Promise<TransactionHash> => {
  if (body.authorAddresses) {
    return sendCeloMintCashbackErc721Transaction(testnet, body, provider)
  } else {
    return sendCeloMintErc721Transaction(testnet, body, provider)
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
  getNFTsByAddress,
  getNFTProvenanceData,
  getNFTContractAddress,
  getNFTMetadataURI,
  getNFTImage,
  getNFTRoyalty,
} from '@tatumio/tatum-defi'
