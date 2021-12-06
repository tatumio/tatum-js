import { CreateRecord, validateBody, TransferErc20, ChainCreateRecord, ChainTransferErc20, Currency } from '@tatumio/tatum-core'
import { sendPolygonStoreDataTransaction, sendPolygonTransaction, sendPolygonTransferErc20SignedTransaction } from './polygon'

/**
 * Store any arbitrary data on the blockchain.
 * @param body Body of the transaction.
 * @param provider Optional provider to use for broadcasting signed tx to the blockchain.
 */
export const storeData = async (body: ChainCreateRecord, provider?: string) => {
  ;(body as CreateRecord).chain = Currency.MATIC
  await validateBody(body, CreateRecord)
  return await sendPolygonStoreDataTransaction(body, provider)
}

/**
 * Perform any native asset transaction.
 * @param body Body of the transaction.
 * @param provider Optional provider to use for broadcasting signed tx to the blockchain.
 */
export const sendTransaction = async (body: ChainTransferErc20, provider?: string) => {
  ;(body as TransferErc20).currency = Currency.MATIC
  const b = body as TransferErc20
  return b.contractAddress ? sendPolygonTransferErc20SignedTransaction(b, provider) : sendPolygonTransaction(b, provider)
}
