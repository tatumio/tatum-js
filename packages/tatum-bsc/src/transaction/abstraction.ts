import { ChainCreateRecord, CreateRecord, Currency, validateBody } from '@tatumio/tatum-core'
import { TransferBscBep20, ChainTransferBscBep20 } from '../'
import { sendBscOrBep20Transaction, sendBscStoreDataTransaction, sendCustomBep20Transaction } from './bsc'

/**
 * Store any arbitrary data on the blockchain.
 * @param body Body of the transaction.
 * @param provider Optional provider to use for broadcasting signed tx to the blockchain.
 */
export const storeData = async (body: ChainCreateRecord, provider?: string) => {
  ;(body as CreateRecord).chain = Currency.BSC
  await validateBody(body, CreateRecord)
  return await sendBscStoreDataTransaction(body, provider)
}

/**
 * Perform any native asset transaction.
 * @param body Body of the transaction.
 * @param provider Optional provider to use for broadcasting signed tx to the blockchain.
 */
export const sendTransaction = async (body: ChainTransferBscBep20, provider?: string) => {
  const b = body as TransferBscBep20
  b.currency = Currency.BSC
  return b.contractAddress ? sendCustomBep20Transaction(b, provider) : sendBscOrBep20Transaction(b, provider)
}
