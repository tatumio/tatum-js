import {
  Currency,
  getPendingTransactionsKMSByChain as getPendingTransactionsKMSByChainCore,
  post,
  SignatureId,
  TransferBtcBasedOffchainKMS,
} from '@tatumio/tatum-core'

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/DogeTransfer" target="_blank">Tatum API documentation</a>
 */
export const offchainTransferDogeKMS = async (body: TransferBtcBasedOffchainKMS): Promise<SignatureId> =>
  post(`/v3/offchain/dogecoin/transfer`, body, TransferBtcBasedOffchainKMS)

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/GetPendingTransactionsToSign" target="_blank">Tatum API documentation</a>
 */
export const getPendingTransactionsKMSByChain = () => {
  return getPendingTransactionsKMSByChainCore(Currency.DOGE)
}
