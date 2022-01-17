/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type Error403TxSenderNotFound = {
    /**
     * senderAccount.not.exists
     */
    errorCode: string;
    /**
     * Unable to find sender account ${transaction.senderAccountId}.
     */
    message: string;
    /**
     * 403
     */
    statusCode: number;
}
