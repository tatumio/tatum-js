import { AddMinter, prepareAddMultiTokenMinterAbstraction, listing } from '@tatumio/tatum-core'
import { helperBroadcastTx, helperPrepareSCCall } from '../helpers'

/**
 * Prepare add new minter to the MultiToken (1155) contract transaction.
 * @param body body of the add minter request
 * @param provider optional provider do broadcast tx
 */
export const prepareAddMultiTokenMinter = async (body: AddMinter, provider?: string) => {
  const params = await prepareAddMultiTokenMinterAbstraction(body)
  return await helperPrepareSCCall(body, 'grantRole', params, undefined, provider, listing.abi)
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
