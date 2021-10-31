import { CreateRecord, validateBody, Currency, TransferErc20 } from '@tatumio/tatum-core'
import { sendPolygonStoreDataTransaction, sendPolygonTransaction } from './polygon'

/**
 * Store any arbitrary data on the blockchain.
 * @param testnet if we are on testnet or not
 * @param body Body of the transaction.
 * @param provider Optional provider to use for broadcasting signed tx to the blockchain.
 */
export const storeData = async (testnet: boolean, body: CreateRecord, provider?: string) => {
  await validateBody(body, CreateRecord)
  return await sendPolygonStoreDataTransaction(testnet, body, provider)
}

/**
 * Perform any native asset transaction.
 * @param testnet if we are on testnet or not
 * @param chain Blockchain to work with. ETH,CELO,MATIC,ONE,TRON,BSC supported now.
 * @param body Body of the transaction.
 * @param provider Optional provider to use for broadcasting signed tx to the blockchain.
 */
export const sendTransaction = async (testnet: boolean, chain: Currency, body: TransferErc20, provider?: string) => {
  ;(body as TransferErc20).currency = chain
  return sendPolygonTransaction(testnet, body as TransferErc20, provider)
}
