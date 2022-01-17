/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type Trade = {
    /**
     * ID of the trade
     */
    id?: string;
    /**
     * Type of the trade, BUY or SELL
     */
    type?: Trade.type;
    /**
     * Price to buy / sell
     */
    price?: string;
    /**
     * Amount of the trade to be bought / sold
     */
    amount?: string;
    /**
     * Trading pair
     */
    pair?: string;
    /**
     * If closed trade was Maker or Taker trade
     */
    isMaker?: boolean;
    /**
     * How much of the trade was already filled.
     */
    fill?: string;
    /**
     * ID of the account where fee will be paid, if any. If trade is a BUY or FUTURE_BUY type, feeAccountId must have same currency as a currency of currency2AccountId, and vice versa if trade is a SELL or FUTURE_SELL type, feeAccountId must have same currency as a currency of currency1AccountId.
     */
    feeAccountId?: string;
    /**
     * Percentage of the trade amount to be paid as a fee.
     */
    fee?: number;
    /**
     * ID of the account of the currenc 1 trade currency
     */
    currency1AccountId?: string;
    /**
     * ID of the account of the currenc 2 trade currency
     */
    currency2AccountId?: string;
    /**
     * Creation date, UTC millis
     */
    created?: number;
    /**
     * Additional attributes for the future type.
     */
    attr?: {
        /**
         * Time in UTC when the future will be filled.
         */
        sealDate: number;
        /**
         * Percentage of the future amount which the selling or buying account must have available for the future’s creation. This amount will be blocked until the future is filled or expires.
         */
        percentBlock?: number;
        /**
         * If one of the parties doesn’t have the full amount of the future at the time of expiration filled, the party will be penalized.
         */
        percentPenalty?: number;
    };
}

export namespace Trade {

    /**
     * Type of the trade, BUY or SELL
     */
    export enum type {
        BUY = 'BUY',
        SELL = 'SELL',
    }


}
