/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type TransferAlgo = {
    /**
     * Sender account ID
     */
    senderAccountId: string;
    /**
     * Blockchain account to send from
     */
    account: string;
    /**
     * Blockchain address to send assets
     */
    address: string;
    /**
     * Amount to be sent, in Algo.
     */
    amount: string;
    /**
     * Secret for account. Secret, or signature Id must be present.
     */
    privateKey: string;
    /**
     * Compliance check, if withdrawal is not compliant, it will not be processed.
     */
    compliant?: boolean;
    /**
     * Identifier of the payment, shown for created Transaction within Tatum sender account.
     */
    paymentId?: string;
    /**
     * Note without any spaces.
     */
    senderNote?: string;
}
