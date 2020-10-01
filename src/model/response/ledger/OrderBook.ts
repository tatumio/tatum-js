import {TradeType} from '../../request/TradeType';

export interface OrderBookResponse {

    /**
     * ID of the trade.
     * @type {string}
     * @memberof OrderBook
     */
    id: string,

    /**
     * Type of the trade, BUY or SELL.
     * @type {string}
     * @memberof OrderBook
     */
    type: TradeType,

    /**
     * Price to buy / sell.
     * @type {string}
     * @memberof OrderBook
     */
    price: string,

    /**
     * Amount of the trade to be bought / sold.
     * @type {string}
     * @memberof OrderBook
     */
    amount: string,

    /**
     * Trading pair.
     * @type {string}
     * @memberof OrderBook
     */
    pair: string,

    /**
     * How much of the trade was already filled.
     * @type {string}
     * @memberof OrderBook
     */
    fill: string,

    /**
     * ID of the account of the currency 1 trade currency.
     * @type {string}
     * @memberof OrderBook
     */
    currency1AccountId: string,

    /**
     * ID of the account of the currency 2 trade currency.
     * @type {string}
     * @memberof OrderBook
     */
    currency2AccountId: string,

    /**
     * Creation date, UTC millis.
     * @type {string}
     * @memberof OrderBook
     */
    created: number,
}
