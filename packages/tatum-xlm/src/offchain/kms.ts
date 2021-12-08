import { Currency, getPendingTransactionsKMSByChain as getPendingTransactionsKMSByChainCore, post, SignatureId } from '@tatumio/tatum-core'
import { TransferXlmOffchainKMS } from '../model'

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/XlmTransfer" target="_blank">Tatum API documentation</a>
 */
export const offchainTransferKMS = async (body: TransferXlmOffchainKMS): Promise<SignatureId> =>
  post(`/v3/offchain/xlm/transfer`, body, TransferXlmOffchainKMS)

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/GetPendingTransactionsToSign" target="_blank">Tatum API documentation</a>
 */
export const getPendingTransactionsKMSByChain = () => {
  return getPendingTransactionsKMSByChainCore(Currency.XLM)
}
