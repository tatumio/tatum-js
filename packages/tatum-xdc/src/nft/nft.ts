import { createNFTAbstraction } from '@tatumio/tatum-defi'
import {
  post,
  BurnErc721,
  DeployErc721,
  MintErc721,
  MintMultipleErc721,
  TransferErc721,
  TransactionHash,
  UpdateCashbackErc721,
} from '@tatumio/tatum-core'

import {
  sendXdcDeployErc721Transaction,
  sendXdcMintErc721Transaction,
  sendXdcMintErcCashback721Transaction,
  sendXdcMintMultipleErc721Transaction,
  sendXdcMintMultipleCashbackErc721Transaction,
  sendXdcBurnErc721Transaction,
  sendXdcUpdateCashbackForAuthorErc721Transaction,
  sendXdcErc721Transaction,
} from '../transaction'

export const mintNFT = (body: MintErc721): Promise<TransactionHash> => post(`/v3/nft/mint`, body)

/**
 * Deploy new NFT smart contract, which will be used for later minting.
 * @param body body of the mint request
 * @param provider optional provider do broadcast tx
 */
export const deployNFT = async (body: DeployErc721, provider?: string): Promise<TransactionHash> => {
  return sendXdcDeployErc721Transaction(body as DeployErc721, provider)
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
export const mintNFTWithUri = async (body: MintErc721, options?: { provider?: string }): Promise<TransactionHash> => {
  if ((body as MintErc721).authorAddresses) {
    return sendXdcMintErcCashback721Transaction(body as MintErc721, options?.provider)
  } else {
    return sendXdcMintErc721Transaction(body as MintErc721, options?.provider)
  }
}

/**
 * Mint multiple new NFT tokens.
 * @param body body of the mint request
 * @param provider optional provider do broadcast tx
 */
export const mintMultipleNFTWithUri = async (body: MintMultipleErc721, provider?: string) => {
  if ((body as MintMultipleErc721).authorAddresses) {
    return sendXdcMintMultipleCashbackErc721Transaction(body as MintMultipleErc721, provider)
  } else {
    return sendXdcMintMultipleErc721Transaction(body as MintMultipleErc721, provider)
  }
}

/**
 * Burn new NFT token. Token will no longer exists.
 * @param body body of the mint request
 * @param provider optional provider do broadcast tx
 */
export const burnNFT = async (body: BurnErc721, provider?: string) => {
  return sendXdcBurnErc721Transaction(body, provider)
}

/**
 * Update royalty cashback as author of the NFT token.
 * @param body body of the mint request
 * @param provider optional provider do broadcast tx
 */
export const updateCashbackForAuthorNFT = async (body: UpdateCashbackErc721, provider?: string) => {
  return sendXdcUpdateCashbackForAuthorErc721Transaction(body, provider)
}

/**
 * Transfer new NFT token to new recipient.
 * @param body body of the mint request
 * @param provider optional provider do broadcast tx
 */
export const transferNFT = async (body: TransferErc721, provider?: string) => {
  return sendXdcErc721Transaction(body, provider)
}

export {
  getNFTsByAddress,
  getNFTProvenanceData,
  getNFTContractAddress,
  getNFTMetadataURI,
  getNFTImage,
  getNFTRoyalty,
} from '@tatumio/tatum-defi'
