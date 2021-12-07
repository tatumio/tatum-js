import { Currency, getPendingTransactionsKMSByChain as getPendingTransactionsKMSByChainCore } from '@tatumio/tatum-core'

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/GetPendingTransactionsToSign" target="_blank">Tatum API documentation</a>
 */
export const getPendingTransactionsKMSByChain = () => {
  return getPendingTransactionsKMSByChainCore(Currency.NEO)
}
