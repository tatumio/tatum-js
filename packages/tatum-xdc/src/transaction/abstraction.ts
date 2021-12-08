import { CreateRecord, validateBody, Currency, TransferErc20, ChainTransferErc20, ChainCreateRecord } from '@tatumio/tatum-core'
import { sendXdcOrErc20Transaction, sendStoreDataTransaction } from './xdc'

/**
 * Store any arbitrary data on the blockchain.
 * @param body Body of the transaction.
 * @param provider Optional provider to use for broadcasting signed tx to the blockchain.
 */
export const storeData = async (body: ChainCreateRecord, provider?: string) => {
  ;(body as CreateRecord).chain = Currency.XDC
  await validateBody(body, CreateRecord)
  return await sendStoreDataTransaction(body, provider)
}

/**
 * Perform any native asset transaction.
 * @param chain Blockchain to work with. ETH,CELO,MATIC,ONE,TRON,BSC supported now.
 * @param body Body of the transaction.
 * @param provider Optional provider to use for broadcasting signed tx to the blockchain.
 */
export const sendTransaction = async (chain: Currency, body: ChainTransferErc20, provider?: string) => {
  ;(body as TransferErc20).currency = chain
  return sendXdcOrErc20Transaction(body, provider)
}
