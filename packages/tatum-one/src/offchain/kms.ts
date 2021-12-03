import { Currency, getPendingTransactionsKMSByChain as getPendingTransactionsKMSByChainCore } from '@tatumio/tatum-core'

export const getPendingTransactionsKMSByChain = () => {
  return getPendingTransactionsKMSByChainCore(Currency.ONE)
}
