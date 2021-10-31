import { get } from '../connector/tatum'
import { Consumption, Currency, Fiat, Rate } from '../model'

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/getExchangeRate" target="_blank">Tatum API documentation</a>
 */
export const getExchangeRate = async (currency: Fiat | Currency, basePair = Fiat.EUR): Promise<Rate> =>
  get(`/v3/tatum/rate/${currency}?basePair=${basePair}`)

/**
 * Returns credit consumption last of month.
 *
 * For more details, see <a href="https://tatum.io/apidoc#operation/getCredits" target="_blank">Tatum API documentation</a>
 */
export const getUsage = async (): Promise<Consumption[]> => get('/v3/tatum/usage')
