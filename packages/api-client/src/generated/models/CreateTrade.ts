/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type CreateTrade = {
    /**
     * Type of the trade, BUY, SELL, FUTURE_BUY, FUTURE_SELL
     */
    type: 'BUY' | 'SELL' | 'FUTURE_BUY' | 'FUTURE_SELL';
    /**
     * Price to buy / sell
     */
    price: string;
    /**
     * Amount of the trade to be bought / sold
     */
    amount: string;
    /**
     * Trading pair
     */
    pair: string;
    /**
     * ID of the account of the currency 1 trade currency
     */
    currency1AccountId: string;
    /**
     * ID of the account of the currency 2 trade currency
     */
    currency2AccountId: string;
    /**
     * ID of the account where fee will be paid, if any. If trade is a BUY or FUTURE_BUY type, feeAccountId must have same currency as a currency of currency2AccountId, and vice versa if trade is a SELL or FUTURE_SELL type, feeAccountId must have same currency as a currency of currency1AccountId.
     */
    feeAccountId?: string;
    /**
     * Percentage of the trade amount to be paid as a fee.
     */
    fee?: number;
    /**
     * Additional attributes for the future type.
     */
    attr: {
        /**
         * Time in UTC when the future will be filled.
         */
        sealDate: number;
        /**
         * Percentage of the future amount which selling or buying account must have available on future creation. This amount will be blocked till future is filled or expires.
         */
        percentBlock?: any;
        /**
         * If one of the parties dont have filled full amount of the future at the time of expiration, the party will be penalized. Penalty is sent to opposite party in exchanged crypto.
         */
        percentPenalty?: any;
    };
}
