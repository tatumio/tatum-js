import { CreateRecord, validateBody, TransferErc20, ChainCreateRecord, Currency, ChainTransferErc20 } from '@tatumio/tatum-core'
import { sendStoreDataTransaction, sendBlockchainTransaction, sendTransfer20SignedTransaction } from '../'

/**
 * Store any arbitrary data on the blockchain.
 * @param body Body of the transaction.
 * @param provider Optional provider to use for broadcasting signed tx to the blockchain.
 */
export const storeData = async (body: ChainCreateRecord, provider?: string) => {
  ;(body as CreateRecord).chain = Currency.ONE
  await validateBody(body, CreateRecord)
  return await sendStoreDataTransaction(body, provider)
}

/**
 * Perform any native asset transaction.
 * @param body Body of the transaction.
 * @param provider Optional provider to use for broadcasting signed tx to the blockchain.
 */
export const sendTransaction = async (body: ChainTransferErc20, provider?: string) => {
  const b = body as TransferErc20
  return b.contractAddress ? sendTransfer20SignedTransaction(b, provider) : sendBlockchainTransaction(b, provider)
}
