import {
  AddMinter,
  BurnMultiToken,
  BurnMultiTokenBatch,
  DeployMultiToken,
  MintMultiToken,
  MintMultiTokenBatch,
  prepareAddMultiTokenMinterAbstraction,
  TransferMultiToken,
  TransferMultiTokenBatch,
  listing,
  getMultiTokenTransaction as getMultiTokenTransactionCore,
  Currency,
} from '@tatumio/tatum-core'
import {
  sendPolygonDeployMultiTokenSignedTransaction,
  sendPolygonMintMultiTokenSignedTransaction,
  sendPolygonMintMultiTokenBatchSignedTransaction,
  sendPolygonBurnMultiTokenSignedTransaction,
  sendPolygonBurnMultiTokenBatchSignedTransaction,
  sendPolygonTransferMultiTokenSignedTransaction,
  preparePolygonBatchTransferMultiTokenSignedTransaction,
  helperPrepareSCCall,
  helperBroadcastTx,
} from '../'
import { MaticTx } from '../model'

export const deployMultiToken = async (body: DeployMultiToken, provider?: string) => {
  return sendPolygonDeployMultiTokenSignedTransaction(body, provider)
}
export const mintMultiToken = async (body: MintMultiToken, provider?: string) => {
  return sendPolygonMintMultiTokenSignedTransaction(body, provider)
}
export const mintMultiTokenBatch = async (body: MintMultiTokenBatch, provider?: string) => {
  return sendPolygonMintMultiTokenBatchSignedTransaction(body, provider)
}
export const burnMultiToken = async (body: BurnMultiToken, provider?: string) => {
  return sendPolygonBurnMultiTokenSignedTransaction(body, provider)
}
export const burnMultiTokenBatch = async (body: BurnMultiTokenBatch, provider?: string) => {
  return sendPolygonBurnMultiTokenBatchSignedTransaction(body, provider)
}

export const transferMultiToken = async (body: TransferMultiToken, provider?: string) => {
  return sendPolygonTransferMultiTokenSignedTransaction(body, provider)
}
export const transferMultiTokenBatch = async (body: TransferMultiTokenBatch, provider?: string) => {
  return preparePolygonBatchTransferMultiTokenSignedTransaction(body, provider)
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
export const getMultiTokenTransaction = (hash: string): Promise<MaticTx> => getMultiTokenTransactionCore<MaticTx>(Currency.MATIC, hash)

export {
  getMultiTokenTransactionsByAddress,
  getMultiTokenContractAddress,
  getMultiTokensBalance,
  getMultiTokensBatchBalance,
  getMultiTokenMetadata,
} from '@tatumio/tatum-core'
