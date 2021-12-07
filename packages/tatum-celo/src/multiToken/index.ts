import {
  CeloDeployMultiToken,
  CeloMintMultiToken,
  CeloMintMultiTokenBatch,
  CeloBurnMultiToken,
  CeloTransferMultiToken,
  CeloTransferMultiTokenBatch,
  CeloBurnMultiTokenBatch,
} from '../model'
import {
  sendBurnMultiTokenBatchTransaction,
  sendBurnMultiTokenTransaction,
  sendDeployMultiTokenTransaction,
  sendMintMultiTokenBatchTransaction,
  sendMintMultiTokenTransaction,
  sendTransferMultiTokenBatchTransaction,
  sendTransferMultiTokenTransaction,
} from '../transaction'
import { AddMinter, prepareAddMultiTokenMinterAbstraction, listing } from '@tatumio/tatum-core'
import { helperBroadcastTx, helperPrepareSCCall } from '../helpers'

export const deployMultiToken = async (testnet: boolean, body: CeloDeployMultiToken, provider?: string) => {
  return sendDeployMultiTokenTransaction(testnet, body as CeloDeployMultiToken, provider)
}

export const mintMultiToken = async (testnet: boolean, body: CeloMintMultiToken, provider?: string) => {
  return sendMintMultiTokenTransaction(testnet, body as CeloMintMultiToken, provider)
}

export const mintMultiTokenBatch = async (testnet: boolean, body: CeloMintMultiTokenBatch, provider?: string) => {
  return sendMintMultiTokenBatchTransaction(testnet, body as CeloMintMultiTokenBatch, provider)
}

export const burnMultiToken = async (testnet: boolean, body: CeloBurnMultiToken, provider?: string) => {
  return sendBurnMultiTokenTransaction(testnet, body as CeloBurnMultiToken, provider)
}

export const burnMultiTokenBatch = async (testnet: boolean, body: CeloBurnMultiTokenBatch, provider?: string) => {
  return sendBurnMultiTokenBatchTransaction(testnet, body as CeloBurnMultiTokenBatch, provider)
}

export const transferMultiToken = async (testnet: boolean, body: CeloTransferMultiToken, provider?: string) => {
  return sendTransferMultiTokenTransaction(testnet, body as CeloTransferMultiToken, provider)
}

export const transferMultiTokenBatch = async (testnet: boolean, body: CeloTransferMultiTokenBatch, provider?: string) => {
  return sendTransferMultiTokenBatchTransaction(testnet, body as CeloTransferMultiTokenBatch, provider)
}

/**
 * Prepare add new minter to the MultiToken (1155) contract transaction.
 * @param testnet if we use testnet or not
 * @param body body of the add minter request
 * @param provider optional provider do broadcast tx
 */
export const prepareAddMultiTokenMinter = async (testnet: boolean, body: AddMinter, provider?: string) => {
  const params = await prepareAddMultiTokenMinterAbstraction(body)
  return await helperPrepareSCCall(testnet, body, 'grantRole', params, provider, listing.abi)
}

/**
 * Add new minter to the MultiToken (1155) contract.
 * @param testnet if we use testnet or not
 * @param body body of the add minter request
 * @param provider optional provider do broadcast tx
 */
export const sendAddMultiTokenMinter = async (testnet: boolean, body: AddMinter, provider?: string) =>
  helperBroadcastTx(await prepareAddMultiTokenMinter(testnet, body, provider), body.signatureId)

export {
  getMultiTokenTransactionsByAddress,
  getMultiTokenContractAddress,
  getMultiTokensBalance,
  getMultiTokensBatchBalance,
  getMultiTokenTransaction,
  getMultiTokenMetadata,
} from '@tatumio/tatum-core'
