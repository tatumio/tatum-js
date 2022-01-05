import { get, post, httpDelete } from '../connector/tatum'
import { OrderBookResponse, OrderBookRequest, HistoricalTrades, ActiveBuyTrades, ActiveSellTrades } from '../model'

/**
 * For more details, see <a href="https://tatum.io/apidoc.php#operation/getHistoricalTrades" target="_blank">Tatum API documentation</a>
 */
export const getHistoricalTrades = async (data: HistoricalTrades): Promise<OrderBookResponse[]> =>
  post('/v3/trade/history', data, HistoricalTrades)

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/getBuyTrades" target="_blank">Tatum API documentation</a>
 */
export const getActiveBuyTrades = async (data: ActiveBuyTrades): Promise<OrderBookResponse[]> =>
  post(`/v3/trade/buy`, data, ActiveBuyTrades)

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/getSellTrades" target="_blank">Tatum API documentation</a>
 */
export const getActiveSellTrades = async (data: ActiveSellTrades): Promise<OrderBookResponse[]> =>
  post(`/v3/trade/sell`, data, ActiveSellTrades)

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/storeTrade" target="_blank">Tatum API documentation</a>
 */
export const storeTrade = async (data: OrderBookRequest): Promise<{ id: string }> => post(`/v3/trade`, data, OrderBookRequest)

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/getTradeById" target="_blank">Tatum API documentation</a>
 */
export const getTradeById = async (id: string): Promise<OrderBookResponse> => get(`/v3/trade/${id}`)

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/deleteTrade" target="_blank">Tatum API documentation</a>
 */
export const deleteTrade = async (id: string): Promise<void> => httpDelete(`/v3/trade/${id}`)

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/deleteAccountTrades" target="_blank">Tatum API documentation</a>
 */
export const deleteAccountTrades = async (id: string): Promise<void> => httpDelete(`/v3/trade/account/${id}`)
