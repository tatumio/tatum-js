import {
  SignatureId,
  TransferTrxOffchain,
  post,
  getPendingTransactionsKMSByChain as getPendingTransactionsKMSByChainCore,
  Currency,
} from '@tatumio/tatum-core'

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/TronTransferOffchain" target="_blank">Tatum API documentation</a>
 */
export const offchainTransferKMS = async (body: TransferTrxOffchain): Promise<SignatureId> =>
  post(`/v3/offchain/tron/transfer`, body, TransferTrxOffchain)

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/GetPendingTransactionsToSign" target="_blank">Tatum API documentation</a>
 */
export const getPendingTransactionsKMSByChain = () => {
  return getPendingTransactionsKMSByChainCore(Currency.TRON)
}
