import {
  MintMultiTokenBatch,
  TransferMultiToken,
  TransferMultiTokenBatch,
  BurnMultiToken,
  BurnMultiTokenBatch,
  DeployMultiToken,
  MintMultiToken,
  AddMinter,
  prepareAddMultiTokenMinterAbstraction,
  getMultiTokenTransaction as getMultiTokenTransactionCore,
  listing,
  Currency,
} from '@tatumio/tatum-core'
import {
  sendEthBurnBatchMultiTokenTransaction,
  sendEthBurnMultiTokenTransaction,
  sendEthDeployMultiTokenTransaction,
  sendEthMintMultiTokenBatchTransaction,
  sendEthMintMultiTokenTransaction,
  sendEthMultiTokenBatchTransaction,
  sendEthMultiTokenTransaction,
} from '../transaction'
import { helperBroadcastTx, helperPrepareSCCall } from '../helpers'
import { ETHTx } from '../model'

export const deployMultiToken = async (body: DeployMultiToken, provider?: string) => {
  return sendEthDeployMultiTokenTransaction(body, provider)
}
export const mintMultiToken = async (body: MintMultiToken, provider?: string) => {
  return sendEthMintMultiTokenTransaction(body, provider)
}
export const mintMultiTokenBatch = async (body: MintMultiTokenBatch, provider?: string) => {
  return sendEthMintMultiTokenBatchTransaction(body, provider)
}
export const burnMultiToken = async (body: BurnMultiToken, provider?: string) => {
  return sendEthBurnMultiTokenTransaction(body, provider)
}
export const burnMultiTokenBatch = async (body: BurnMultiTokenBatch, provider?: string) => {
  return sendEthBurnBatchMultiTokenTransaction(body, provider)
}

export const transferMultiToken = async (body: TransferMultiToken, provider?: string) => {
  return sendEthMultiTokenTransaction(body, provider)
}
export const transferMultiTokenBatch = async (body: TransferMultiTokenBatch, provider?: string) => {
  return sendEthMultiTokenBatchTransaction(body, provider)
}

/**
 * Prepare add new minter to the MultiToken (1155) contract transaction.
 * @param body body of the add minter request
 * @param provider optional provider do broadcast tx
 */
export const prepareAddMultiTokenMinter = async (body: AddMinter, provider?: string) => {
  const params = await prepareAddMultiTokenMinterAbstraction(body)
  return await helperPrepareSCCall(body, 'grantRole', params, provider, listing.abi)
}

/**
 * Add new minter to the MultiToken (1155) contract.
 * @param body body of the add minter request
 * @param provider optional provider do broadcast tx
 */
export const sendAddMultiTokenMinter = async (body: AddMinter, provider?: string) =>
  helperBroadcastTx(await prepareAddMultiTokenMinter(body, provider), body.signatureId)

/**
 * Get Multi Token transaction by transaction hash.
 * @param hash Transaction hash
 */
export const getMultiTokenTransaction = (hash: string): Promise<ETHTx> => getMultiTokenTransactionCore<ETHTx>(Currency.ETH, hash)

export {
  getMultiTokenTransactionsByAddress,
  getMultiTokenContractAddress,
  getMultiTokensBalance,
  getMultiTokensBatchBalance,
  getMultiTokenMetadata,
} from '@tatumio/tatum-core'
