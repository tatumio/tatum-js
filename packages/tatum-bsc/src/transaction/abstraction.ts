import { CreateRecord, validateBody, Currency } from '@tatumio/tatum-core'
import { TransferBscBep20 } from '../'
import { sendBscOrBep20Transaction, sendBscStoreDataTransaction } from './bsc'

/**
 * Store any arbitrary data on the blockchain.
 * @param body Body of the transaction.
 * @param provider Optional provider to use for broadcasting signed tx to the blockchain.
 */
export const storeData = async (body: CreateRecord, provider?: string) => {
  await validateBody(body, CreateRecord)
  return await sendBscStoreDataTransaction(body, provider)
}

/**
 * Perform any native asset transaction.
 * @param testnet if we are on testnet or not
 * @param chain Blockchain to work with. ETH,CELO,MATIC,ONE,TRON,BSC supported now.
 * @param body Body of the transaction.
 * @param provider Optional provider to use for broadcasting signed tx to the blockchain.
 */
export const sendTransaction = async (testnet: boolean, chain: Currency, body: TransferBscBep20, provider?: string) => {
  body.currency = chain
  return sendBscOrBep20Transaction(body, provider)
}
