import { validateBody, CreateRecord, TransferErc20 } from '@tatumio/tatum-core'
import { sendCustomErc20Transaction, sendEthOrErc20Transaction, sendStoreDataTransaction } from './eth'

/**
 * Store any arbitrary data on the blockchain.
 * @param body Body of the transaction.
 * @param provider Optional provider to use for broadcasting signed tx to the blockchain.
 */
export const storeData = async (body: CreateRecord, provider?: string) => {
  await validateBody(body, CreateRecord)
  return await sendStoreDataTransaction(body, provider)
}

/**
 * Perform any native asset transaction.
 * @param body Body of the transaction.
 * @param provider Optional provider to use for broadcasting signed tx to the blockchain.
 */
export const sendTransaction = async (body: TransferErc20, provider?: string) => {
  const b = body as TransferErc20
  return b.contractAddress ? sendCustomErc20Transaction(b, provider) : sendEthOrErc20Transaction(b, provider)
}
