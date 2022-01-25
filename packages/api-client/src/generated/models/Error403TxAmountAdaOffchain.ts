/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type Error403TxAmountAdaOffchain = {
    /**
     * amount.ada
     */
    errorCode: string;
    /**
     * ADA payment amount must be at least 0.000000000001, not ${transaction.amount}.
     */
    message: string;
    /**
     * 403
     */
    statusCode: number;
}
