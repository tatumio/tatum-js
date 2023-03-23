/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type Error403TxAmountBtcOffchain = {
    /**
     * transaction.amount.btc
     */
    errorCode: string;
    /**
     * BTC|LTC|BCH|DOGE payment amount must be at least 0.00000001, not ${transaction.amount}.
     */
    message: string;
    /**
     * 403
     */
    statusCode: number;
}
