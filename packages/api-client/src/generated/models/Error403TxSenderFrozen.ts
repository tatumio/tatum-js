/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type Error403TxSenderFrozen = {
    /**
     * senderAccount.frozen
     */
    errorCode: string;
    /**
     * Sender account ${transaction.senderAccountId} is frozen, unable to perform payment.
     */
    message: string;
    /**
     * 403
     */
    statusCode: number;
}
