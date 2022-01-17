/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type Error403TxCurrency = {
    /**
     * transaction.currency.incompatible
     */
    errorCode: string;
    /**
     * Incompatible currencies for sender account ${transaction.senderAccountId} and recipient account ${transaction.recipientAccountId}.
     */
    message: string;
    /**
     * 403
     */
    statusCode: number;
}
