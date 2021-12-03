import { validateBody, CreateRecord, TransferErc20, ChainCreateRecord, ChainTransferErc20, Currency } from '@tatumio/tatum-core'
import { sendCustomErc20Transaction, sendEthOrErc20Transaction, sendStoreDataTransaction } from './eth'

/**
 * Store any arbitrary data on the blockchain.
 * @param body Body of the transaction.
 * @param provider Optional provider to use for broadcasting signed tx to the blockchain.
 */
export const storeData = async (body: ChainCreateRecord, provider?: string) => {
  ;(body as CreateRecord).chain = Currency.ETH
  await validateBody(body, CreateRecord)
  return await sendStoreDataTransaction(body, provider)
}

/**
 * Perform any native asset transaction.
 * @param body Body of the transaction.
 * @param provider Optional provider to use for broadcasting signed tx to the blockchain.
 */
export const sendTransaction = async (body: ChainTransferErc20, provider?: string) => {
  ;(body as TransferErc20).currency = Currency.ETH
  const b = body as TransferErc20
  return b.contractAddress ? sendCustomErc20Transaction(b, provider) : sendEthOrErc20Transaction(b, provider)
}
