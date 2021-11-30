import { createNFTAbstraction, mintNFTRequest, prepareAddNFTMinterAbstraction } from '@tatumio/tatum-defi'
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
  return await createNFTAbstraction(() => mintNFTWithUri(false, body, provider), false, body, file, name, description, scheme, provider)
}

/**
 * Mint new NFT token.
 * @param body body of the mint request
 * @param provider optional provider do broadcast tx
 */
export const mintNFTWithUri = async (_testnet: boolean, body: MintErc721, provider?: string) => {
  if ((body as MintErc721).authorAddresses) {
    return sendMintCashbackErc721Transaction(body as MintErc721, provider)
  } else {
    return sendMintErc721Transaction(body as MintErc721, provider)
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

export {
  getNFTTransactionsByAddress,
  getNFTsByAddress,
  getNFTProvenanceData,
  getNFTContractAddress,
  getNFTMetadataURI,
  getNFTImage,
  getNFTRoyalty,
} from '@tatumio/tatum-defi'
