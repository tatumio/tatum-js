import {TradeType} from '../../request/OrderBook';

export interface OrderBookResponse {
    id: string,
    type: TradeType,
    price: string,
    amount: string,
    pair: string,
    fill: string,
    currency1AccountId: string,
    currency2AccountId: string,
    created: number,
}
