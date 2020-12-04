import { OrderBookRequest } from '../model/request/OrderBook';
import { OrderBookResponse } from '../model/response/ledger/OrderBook';
/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/getHistoricalTrades" target="_blank">Tatum API documentation</a>
 */
export declare const getHistoricalTrades: (pageSize?: number, offset?: number) => Promise<OrderBookResponse[]>;
/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/getBuyTrades" target="_blank">Tatum API documentation</a>
 */
export declare const getActiveBuyTrades: (id: string, pageSize?: number, offset?: number) => Promise<OrderBookResponse[]>;
/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/getSellTrades" target="_blank">Tatum API documentation</a>
 */
export declare const getActiveSellTrades: (id: string, pageSize?: number, offset?: number) => Promise<OrderBookResponse[]>;
/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/storeTrade" target="_blank">Tatum API documentation</a>
 */
export declare const storeTrade: (data: OrderBookRequest) => Promise<{
    id: string;
}>;
/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/getTradeById" target="_blank">Tatum API documentation</a>
 */
export declare const getTradeById: (id: string) => Promise<OrderBookResponse>;
/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/deleteTrade" target="_blank">Tatum API documentation</a>
 */
export declare const deleteTrade: (id: string) => Promise<void>;
/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/deleteAccountTrades" target="_blank">Tatum API documentation</a>
 */
export declare const deleteAccountTrades: (id: string) => Promise<void>;
