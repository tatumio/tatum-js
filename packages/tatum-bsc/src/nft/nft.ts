import { createNFTAbstraction, mintNFTRequest, prepareAddNFTMinterAbstraction } from '@tatumio/tatum-defi'
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
} from '@tatumio/tatum-core'
import {
  sendDeployBep721Transaction,
  sendMintBepCashback721Transaction,
  sendMintBep721Transaction,
  sendMintMultipleCashbackBep721Transaction,
  sendMintMultipleBep721Transaction,
  sendBurnBep721Transaction,
  sendUpdateCashbackForAuthorBep721Transaction,
  sendBep721Transaction,
  helperBroadcastTx,
  helperPrepareSCCall,
} from '../'

export const mintNFT = (body: MintErc721): Promise<TransactionHash> => mintNFTRequest(body)

/**
 * Deploy new NFT smart contract, which will be used for later minting.
 * @param body body of the mint request
 * @param provider optional provider do broadcast tx
 */
export const deployNFT = async (body: DeployErc721, provider?: string): Promise<TransactionHash> => {
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
 * @param provider optional provider do broadcast tx
 */
export const mintNFTWithUri = async (body: MintErc721, options?: { provider?: string }): Promise<TransactionHash> => {
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
export const mintMultipleNFTWithUri = async (body: MintMultipleErc721, provider?: string) => {
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
export const burnNFT = async (body: BurnErc721, provider?: string) => {
  return sendBurnBep721Transaction(body, provider)
}

/**
 * Update royalty cashback as author of the NFT token.
 * @param body body of the mint request
 * @param provider optional provider do broadcast tx
 */
export const updateCashbackForAuthorNFT = async (body: UpdateCashbackErc721, provider?: string) => {
  return sendUpdateCashbackForAuthorBep721Transaction(body, provider)
}

/**
 * Transfer new NFT token to new recipient.
 * @param body body of the mint request
 * @param provider optional provider do broadcast tx
 */
export const transferNFT = async (body: TransferErc721, provider?: string) => {
  return sendBep721Transaction(body, provider)
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

export {
  getNFTsByAddress,
  getNFTProvenanceData,
  getNFTContractAddress,
  getNFTMetadataURI,
  getNFTImage,
  getNFTRoyalty,
} from '@tatumio/tatum-defi'
