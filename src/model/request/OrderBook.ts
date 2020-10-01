export interface OrderBookRequest {
    type: TradeType,
    price: string,
    amount: string,
    pair: string,
    currency1AccountId: string,
    currency2AccountId: string,
}

export enum TradeType {
    BUY = 'BUY',
    SELL = 'SELL',
}
