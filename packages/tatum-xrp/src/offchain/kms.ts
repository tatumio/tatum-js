import { SignatureId, post, getPendingTransactionsKMSByChain as getPendingTransactionsKMSByChainCore, Currency } from '@tatumio/tatum-core'
import { TransferXrpOffchainKMS } from '../model'

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/XrpTransfer" target="_blank">Tatum API documentation</a>
 */
export const offchainTransferXrpKMS = async (body: TransferXrpOffchainKMS): Promise<SignatureId> =>
  post(`/v3/offchain/xrp/transfer`, body, TransferXrpOffchainKMS)

export const getPendingTransactionsKMSByChain = () => {
  return getPendingTransactionsKMSByChainCore(Currency.XRP)
}
