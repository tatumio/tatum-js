import { prepareAddMultiTokenMinterAbstraction, listing, ChainAddMinter, Currency } from '@tatumio/tatum-core'
import { helperBroadcastTx, helperPrepareSCCall } from '../helpers'

/**
 * Prepare add new minter to the MultiToken (1155) contract transaction.
 * @param body body of the add minter request
 * @param provider optional provider do broadcast tx
 */
export const prepareAddMultiTokenMinter = async (body: ChainAddMinter, provider?: string) => {
  const params = await prepareAddMultiTokenMinterAbstraction({ ...body, chain: Currency.TRON })
  return await helperPrepareSCCall(body, 'grantRole', params, undefined, provider, listing.abi)
}

/**
 * Add new minter to the MultiToken (1155) contract.
 * @param body body of the add minter request
 * @param provider optional provider do broadcast tx
 */
export const sendAddMultiTokenMinter = async (body: ChainAddMinter, provider?: string) =>
  helperBroadcastTx(await prepareAddMultiTokenMinter(body, provider), body.signatureId)
