/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type Error403TxAmountBtc = {
    /**
     * amount.btc
     */
    errorCode: string;
    /**
     * BTC|LTC|BCH payment amount must be at least 0.00000000000001, not ${transaction.amount}.
     */
    message: string;
    /**
     * 403
     */
    statusCode: number;
}
