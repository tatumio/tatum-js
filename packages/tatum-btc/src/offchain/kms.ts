import {
  TransferBtcBasedOffchainKMS,
  Currency,
  getPendingTransactionsKMSByChain as getPendingTransactionsKMSByChainCore,
  post,
  SignatureId,
} from '@tatumio/tatum-core'
/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/BtcTransfer" target="_blank">Tatum API documentation</a>
 */
export const offchainTransferBtcKMS = async (body: TransferBtcBasedOffchainKMS): Promise<SignatureId> =>
  post(`/v3/offchain/bitcoin/transfer`, body, TransferBtcBasedOffchainKMS)

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/GetPendingTransactionsToSign" target="_blank">Tatum API documentation</a>
 */
export const getPendingTransactionsKMSByChain = () => {
  return getPendingTransactionsKMSByChainCore(Currency.BTC)
}
