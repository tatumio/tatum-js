import {
  DeployMultiToken,
  MintMultiToken,
  MintMultiTokenBatch,
  BurnMultiToken,
  BurnMultiTokenBatch,
  TransferMultiToken,
  TransferMultiTokenBatch,
  prepareAddMultiTokenMinterAbstraction,
  AddMinter,
  listing,
} from '@tatumio/tatum-core'
import {
  sendBscDeployMultiTokenTransaction,
  sendBscMintMultiTokenTransaction,
  sendBscMintMultiTokenBatchTransaction,
  sendBscBurnMultiTokenTransaction,
  sendBscBurnBatchMultiTokenTransaction,
  sendBscMultiTokenTransaction,
  sendBscMultiTokenBatchTransaction,
  helperPrepareSCCall,
  helperBroadcastTx,
} from '../'

export const deployMultiToken = async (body: DeployMultiToken, provider?: string) => {
  return sendBscDeployMultiTokenTransaction(body, provider)
}
export const mintMultiToken = async (body: MintMultiToken, provider?: string) => {
  return sendBscMintMultiTokenTransaction(body, provider)
}
export const mintMultiTokenBatch = async (body: MintMultiTokenBatch, provider?: string) => {
  return sendBscMintMultiTokenBatchTransaction(body, provider)
}
export const burnMultiToken = async (body: BurnMultiToken, provider?: string) => {
  return sendBscBurnMultiTokenTransaction(body, provider)
}
export const burnMultiTokenBatch = async (body: BurnMultiTokenBatch, provider?: string) => {
  return sendBscBurnBatchMultiTokenTransaction(body, provider)
}

export const transferMultiToken = async (body: TransferMultiToken, provider?: string) => {
  return sendBscMultiTokenTransaction(body, provider)
}
export const transferMultiTokenBatch = async (body: TransferMultiTokenBatch, provider?: string) => {
  return sendBscMultiTokenBatchTransaction(body, provider)
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
