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
} from '@tatumio/tatum-core'
import {
  prepareOneBatchTransferMultiTokenSignedTransaction,
  sendOneBurnMultiTokenBatchSignedTransaction,
  sendOneBurnMultiTokenSignedTransaction,
  sendOneDeployMultiTokenSignedTransaction,
  sendOneMintMultiTokenBatchSignedTransaction,
  sendOneMintMultiTokenSignedTransaction,
  sendOneTransferMultiTokenSignedTransaction,
} from '../transaction'
import { helperBroadcastTx, helperPrepareSCCall } from '../helpers'

export const deployMultiToken = async (body: DeployMultiToken, provider?: string) => {
  return sendOneDeployMultiTokenSignedTransaction(body, provider)
}
export const mintMultiToken = async (body: MintMultiToken, provider?: string) => {
  return sendOneMintMultiTokenSignedTransaction(body, provider)
}
export const mintMultiTokenBatch = async (body: MintMultiTokenBatch, provider?: string) => {
  return sendOneMintMultiTokenBatchSignedTransaction(body, provider)
}
export const burnMultiToken = async (body: BurnMultiToken, provider?: string) => {
  return sendOneBurnMultiTokenSignedTransaction(body, provider)
}
export const burnMultiTokenBatch = async (body: BurnMultiTokenBatch, provider?: string) => {
  return sendOneBurnMultiTokenBatchSignedTransaction(body, provider)
}

export const transferMultiToken = async (body: TransferMultiToken, provider?: string) => {
  return sendOneTransferMultiTokenSignedTransaction(body, provider)
}
export const transferMultiTokenBatch = async (body: TransferMultiTokenBatch, provider?: string) => {
  return prepareOneBatchTransferMultiTokenSignedTransaction(body, provider)
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

export {
  getMultiTokenContractAddress,
  getMultiTokensBalance,
  getMultiTokensBatchBalance,
  getMultiTokenTransaction,
  getMultiTokenMetadata,
} from '@tatumio/tatum-core'
