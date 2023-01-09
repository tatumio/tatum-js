/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type CreateTrade = {
    /**
     * Type of the regular trade, BUY, SELL
     */
    type: 'BUY' | 'SELL';
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
}
