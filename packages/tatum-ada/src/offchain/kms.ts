import {
  post,
  SignatureId,
  TransferBtcBasedOffchainKMS,
  Currency,
  getPendingTransactionsKMSByChain as getPendingTransactionsKMSByChainCore,
} from '@tatumio/tatum-core'

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/AdaTransferOffchain" target="_blank">Tatum API documentation</a>
 */
export const offchainTransferAdaKMS = async (body: TransferBtcBasedOffchainKMS): Promise<SignatureId> =>
  post(`/v3/offchain/ada/transfer`, body, TransferBtcBasedOffchainKMS)

export const getPendingTransactionsKMSByChain = () => {
  return getPendingTransactionsKMSByChainCore(Currency.ADA)
}
