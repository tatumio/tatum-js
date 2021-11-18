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

export const deployMultiToken = async (testnet: boolean, body: DeployMultiToken, provider?: string) => {
  return sendOneDeployMultiTokenSignedTransaction(testnet, body, provider)
}
export const mintMultiToken = async (testnet: boolean, body: MintMultiToken, provider?: string) => {
  return sendOneMintMultiTokenSignedTransaction(testnet, body, provider)
}
export const mintMultiTokenBatch = async (testnet: boolean, body: MintMultiTokenBatch, provider?: string) => {
  return sendOneMintMultiTokenBatchSignedTransaction(testnet, body, provider)
}
export const burnMultiToken = async (testnet: boolean, body: BurnMultiToken, provider?: string) => {
  return sendOneBurnMultiTokenSignedTransaction(testnet, body, provider)
}
export const burnMultiTokenBatch = async (testnet: boolean, body: BurnMultiTokenBatch, provider?: string) => {
  return sendOneBurnMultiTokenBatchSignedTransaction(testnet, body, provider)
}

export const transferMultiToken = async (testnet: boolean, body: TransferMultiToken, provider?: string) => {
  return sendOneTransferMultiTokenSignedTransaction(testnet, body, provider)
}
export const transferMultiTokenBatch = async (testnet: boolean, body: TransferMultiTokenBatch, provider?: string) => {
  return prepareOneBatchTransferMultiTokenSignedTransaction(testnet, body, provider)
}

/**
 * Prepare add new minter to the MultiToken (1155) contract transaction.
 * @param testnet if we use testnet or not
 * @param body body of the add minter request
 * @param provider optional provider do broadcast tx
 */
export const prepareAddMultiTokenMinter = async (testnet: boolean, body: AddMinter, provider?: string) => {
  const params = await prepareAddMultiTokenMinterAbstraction(body)
  return await helperPrepareSCCall(testnet, body, AddMinter, 'grantRole', params, undefined, provider, listing.abi)
}

/**
 * Add new minter to the MultiToken (1155) contract.
 * @param testnet if we use testnet or not
 * @param body body of the add minter request
 * @param provider optional provider do broadcast tx
 */
export const sendAddMultiTokenMinter = async (testnet: boolean, body: AddMinter, provider?: string) =>
  helperBroadcastTx(body.chain, await prepareAddMultiTokenMinter(testnet, body, provider), body.signatureId)

export {
  getMultiTokenContractAddress,
  getMultiTokensBalance,
  getMultiTokensBatchBalance,
  getMultiTokenTransaction,
  getMultiTokenMetadata,
} from '@tatumio/tatum-core'
