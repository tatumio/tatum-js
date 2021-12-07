import {
  Currency,
  getPendingTransactionsKMSByChain as getPendingTransactionsKMSByChainCore,
  post,
  SignatureId,
  TransferOffchainKMS,
} from '@tatumio/tatum-core'

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/XdcTransfer" target="_blank">Tatum API documentation</a>
 */
export const offchainTransferXdcKMS = async (body: TransferOffchainKMS): Promise<SignatureId> =>
  post(`/v3/offchain/xdc/transfer`, body, TransferOffchainKMS)

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/GetPendingTransactionsToSign" target="_blank">Tatum API documentation</a>
 */
export const getPendingTransactionsKMSByChain = () => {
  return getPendingTransactionsKMSByChainCore(Currency.XDC)
}
