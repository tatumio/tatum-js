import { OrderBookResponse, OrderBookRequest, get, post, httpDelete } from '@tatumio/tatum-core'

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/getHistoricalTrades" target="_blank">Tatum API documentation</a>
 */
export const getHistoricalTrades = async (pageSize = 50, offset = 0, id?: string, pair?: string): Promise<OrderBookResponse[]> => {
  let url = `/v3/trade/history?pageSize=${pageSize}&offset=${offset}`
  if (id) {
    url += `&id=${id}`
  }
  if (pair) {
    url += `&pair=${pair}`
  }
  return get(url)
}

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/getBuyTrades" target="_blank">Tatum API documentation</a>
 */
export const getActiveBuyTrades = async (id: string, pageSize = 50, offset = 0): Promise<OrderBookResponse[]> =>
  get(`/v3/trade/buy?id=${id}&pageSize=${pageSize}&offset=${offset}`)

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/getSellTrades" target="_blank">Tatum API documentation</a>
 */
export const getActiveSellTrades = async (id: string, pageSize = 50, offset = 0): Promise<OrderBookResponse[]> =>
  get(`/v3/trade/sell?id=${id}&pageSize=${pageSize}&offset=${offset}`)

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
