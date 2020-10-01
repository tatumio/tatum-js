import axios from 'axios'
import {TATUM_API_URL} from '../constants'
import {OrderBookRequest} from '../model/request/OrderBook';
import {OrderBookResponse} from '../model/response/ledger/OrderBook'

/**
 * For more details, see <a href="https://tatum.io/apidoc.html#operation/getHistoricalTrades" target="_blank">Tatum API documentation</a>
 */
export const getHistoricalTrades = async (pageSize: number = 50, offset: number = 0): Promise<OrderBookResponse[]> => {
    return (await axios.get(
        `${process.env.TATUM_API_URL || TATUM_API_URL}/v3/trade/history?pageSize=${pageSize}&offset=${offset}`,
        {headers: {'x-api-key': process.env.TATUM_API_KEY}})).data
}

/**
 * For more details, see <a href="https://tatum.io/apidoc.html#operation/getBuyTrades" target="_blank">Tatum API documentation</a>
 */
export const getActiveBuyTrades = async (id: string, pageSize: number = 50, offset: number = 0): Promise<OrderBookResponse[]> => {
    return (await axios.get(
        `${process.env.TATUM_API_URL || TATUM_API_URL}/v3/trade/buy?id=${id}&pageSize=${pageSize}&offset=${offset}`,
        {headers: {'x-api-key': process.env.TATUM_API_KEY}})).data
}

/**
 * For more details, see <a href="https://tatum.io/apidoc.html#operation/getSellTrades" target="_blank">Tatum API documentation</a>
 */
export const getActiveSellTrades = async (id: string, pageSize: number = 50, offset: number = 0): Promise<OrderBookResponse[]> => {
    return (await axios.get(
        `${process.env.TATUM_API_URL || TATUM_API_URL}/v3/trade/sell?id=${id}&pageSize=${pageSize}&offset=${offset}`,
        {headers: {'x-api-key': process.env.TATUM_API_KEY}})).data
}

/**
 * For more details, see <a href="https://tatum.io/apidoc.html#operation/storeTrade" target="_blank">Tatum API documentation</a>
 */
export const storeTrade = async (data: OrderBookRequest): Promise<{ id: string }> => {
    return (await axios.post(
        `${process.env.TATUM_API_URL || TATUM_API_URL}/v3/trade`,
        data,
        {headers: {'x-api-key': process.env.TATUM_API_KEY}})).data
}

/**
 * For more details, see <a href="https://tatum.io/apidoc.html#operation/getTradeById" target="_blank">Tatum API documentation</a>
 */
export const getTradeById = async (id: string): Promise<OrderBookResponse> => {
    return (await axios.get(
        `${process.env.TATUM_API_URL || TATUM_API_URL}/v3/trade/${id}`,
        {headers: {'x-api-key': process.env.TATUM_API_KEY}})).data
}

/**
 * For more details, see <a href="https://tatum.io/apidoc.html#operation/deleteTrade" target="_blank">Tatum API documentation</a>
 */
export const deleteTrade = async (id: string): Promise<void> => {
    return (await axios.delete(
        `${process.env.TATUM_API_URL || TATUM_API_URL}/v3/trade/${id}`,
        {headers: {'x-api-key': process.env.TATUM_API_KEY}})).data
}

/**
 * For more details, see <a href="https://tatum.io/apidoc.html#operation/deleteAccountTrades" target="_blank">Tatum API documentation</a>
 */
export const deleteAccountTrades = async (id: string): Promise<void> => {
    return (await axios.delete(
        `${process.env.TATUM_API_URL || TATUM_API_URL}/v3/trade/account/${id}`,
        {headers: {'x-api-key': process.env.TATUM_API_KEY}})).data
}
