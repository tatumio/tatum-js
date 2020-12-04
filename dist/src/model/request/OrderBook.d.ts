import { TradeType } from './TradeType';
export declare class OrderBookRequest {
    type: TradeType;
    price: string;
    amount: string;
    pair: string;
    currency1AccountId: string;
    currency2AccountId: string;
    fee?: number;
    feeAccountId?: string;
}
