/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type Error403TxBalance = {
    /**
     * balance.insufficient
     */
    errorCode: string;
    /**
     * Insufficient balance for account ${transaction.senderAccountId} and payment amount ${transaction.amount}. Sender balance is ${senderAccount.balance.availableBalance as string}, amount is ${amount}
     */
    message: string;
    /**
     * 403
     */
    statusCode: number;
}
