/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type Error403TxAmountEthOffchain = {
    /**
     * transaction.amount.eth
     */
    errorCode: string;
    /**
     * ETH payment amount must be at least 0.000000000000000001, not ${transaction.amount}.
     */
    message: string;
    /**
     * 403
     */
    statusCode: number;
}
