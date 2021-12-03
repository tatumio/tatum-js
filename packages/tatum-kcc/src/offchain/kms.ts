import {
  post,
  TransferOffchainKMS,
  SignatureId,
  getPendingTransactionsKMSByChain as getPendingTransactionsKMSByChainCore,
  Currency,
} from '@tatumio/tatum-core'

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/KccTransfer" target="_blank">Tatum API documentation</a>
 */
export const offchainTransferKccKMS = async (body: TransferOffchainKMS): Promise<SignatureId> =>
  post(`/v3/offchain/kcc/transfer`, body, TransferOffchainKMS)

export const getPendingTransactionsKMSByChain = () => {
  return getPendingTransactionsKMSByChainCore(Currency.KCS)
}
