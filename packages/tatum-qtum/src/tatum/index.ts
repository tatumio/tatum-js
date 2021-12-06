import { Currency, Fiat, getExchangeRate as getExchangeRateCore } from '@tatumio/tatum-core'

export const getExchangeRate = async (basePair?: Fiat) => {
  return getExchangeRateCore(Currency.ONE, basePair)
}
