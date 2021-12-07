import { Currency, Fiat, getExchangeRate as getExchangeRateCore } from '@tatumio/tatum-core'

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/getExchangeRate" target="_blank">Tatum API documentation</a>
 */
export const getExchangeRate = async (basePair?: Fiat) => {
  return getExchangeRateCore(Currency.BCH, basePair)
}
