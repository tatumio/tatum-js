import { CreateRecord, validateBody, Currency, TransferErc20 } from '@tatumio/tatum-core'
import { sendOneStoreDataTransaction, sendOneTransaction } from '../'

/**
 * Store any arbitrary data on the blockchain.
 * @param body Body of the transaction.
 * @param provider Optional provider to use for broadcasting signed tx to the blockchain.
 */
export const storeData = async (body: CreateRecord, provider?: string) => {
  await validateBody(body, CreateRecord)
  return await sendOneStoreDataTransaction(body, provider)
}

/**
 * Perform any native asset transaction.
 * @param chain Blockchain to work with. ETH,CELO,MATIC,ONE,TRON,BSC supported now.
 * @param body Body of the transaction.
 * @param provider Optional provider to use for broadcasting signed tx to the blockchain.
 */
export const sendTransaction = async (chain: Currency, body: TransferErc20, provider?: string) => {
  ;(body as TransferErc20).currency = chain
  return sendOneTransaction(body as TransferErc20, provider)
}
