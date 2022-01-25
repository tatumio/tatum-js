/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type Error403TxRecipientNotFound = {
    /**
     * recipientAccount.not.exists
     */
    errorCode: string;
    /**
     * Unable to find recipient account ${transaction.recipientAccountId}.
     */
    message: string;
    /**
     * 403
     */
    statusCode: number;
}
