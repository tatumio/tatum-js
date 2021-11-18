import { CreateRecord, validateBody, Currency, TransferErc20 } from '@tatumio/tatum-core'
import { sendPolygonStoreDataTransaction, sendPolygonTransaction, sendPolygonTransferErc20SignedTransaction } from './polygon'

/**
 * Store any arbitrary data on the blockchain.
 * @param body Body of the transaction.
 * @param provider Optional provider to use for broadcasting signed tx to the blockchain.
 */
export const storeData = async (body: CreateRecord, provider?: string) => {
  await validateBody(body, CreateRecord)
  return await sendPolygonStoreDataTransaction(body, provider)
}

/**
 * Perform any native asset transaction.
 * @param chain Blockchain to work with. ETH,CELO,MATIC,ONE,TRON,BSC supported now.
 * @param body Body of the transaction.
 * @param provider Optional provider to use for broadcasting signed tx to the blockchain.
 */
export const sendTransaction = async (chain: Currency, body: TransferErc20, provider?: string) => {
  const b = body as TransferErc20
  return b.contractAddress ? sendPolygonTransferErc20SignedTransaction(b, provider) : sendPolygonTransaction(b, provider)
}
