import { CreateRecord, validateBody, Currency, TransferErc20, ChainCreateRecord, ChainTransferErc20 } from '@tatumio/tatum-core'
import { sendKcsStoreDataTransaction, sendKcsTransaction } from './kcs'

/**
 * Store any arbitrary data on the blockchain.
 * @param body Body of the transaction.
 * @param provider Optional provider to use for broadcasting signed tx to the blockchain.
 */
export const storeData = async (body: ChainCreateRecord, provider?: string) => {
  ;(body as CreateRecord).chain = Currency.KCS
  await validateBody(body, CreateRecord)
  return await sendKcsStoreDataTransaction(body, provider)
}

/**
 * Perform any native asset transaction.
 * @param chain Blockchain to work with. ETH,CELO,MATIC,ONE,TRON,BSC,KCS supported now.
 * @param body Body of the transaction.
 * @param provider Optional provider to use for broadcasting signed tx to the blockchain.
 */
export const sendTransaction = async (chain: Currency, body: ChainTransferErc20, provider?: string) => {
  ;(body as TransferErc20).currency = chain
  return sendKcsTransaction(body, provider)
}
