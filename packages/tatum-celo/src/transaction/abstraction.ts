import { CreateRecord, validateBody, Currency, ChainCreateRecord } from '@tatumio/tatum-core'
import { sendStoreDataSignedTransaction, sendCeloOrcUsdTransaction, sendErc20Transaction } from '../transaction'
import { TransferCeloOrCeloErc20Token } from '../model'

/**
 * Store any arbitrary data on the blockchain.
 * @param testnet if we are on testnet or not
 * @param body Body of the transaction.
 * @param provider Optional provider to use for broadcasting signed tx to the blockchain.
 */
export const storeData = async (testnet: boolean, body: ChainCreateRecord, provider?: string) => {
  ;(body as CreateRecord).chain = Currency.CELO
  await validateBody(body, CreateRecord)
  return await sendStoreDataSignedTransaction(testnet, body, provider)
}

/**
 * Perform any native asset transaction.
 * @param testnet if we are on testnet or not
 * @param body Body of the transaction.
 * @param provider Optional provider to use for broadcasting signed tx to the blockchain.
 */
export const sendTransaction = async (testnet: boolean, body: TransferCeloOrCeloErc20Token, provider?: string) => {
  const b = body as TransferCeloOrCeloErc20Token
  b.feeCurrency = Currency.CELO
  return b.contractAddress ? sendErc20Transaction(testnet, b) : sendCeloOrcUsdTransaction(testnet, b, provider)
}
