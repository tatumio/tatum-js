/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type TransferSol = {
    /**
     * Sender account ID
     */
    senderAccountId: string;
    /**
     * Blockchain account to send from
     */
    from: string;
    /**
     * Blockchain address to send assets
     */
    address: string;
    /**
     * Amount to be sent, in SOL.
     */
    amount: string;
    /**
     * Private key for account. Private key, or signature Id must be present.
     */
    privateKey: string;
    /**
     * Fee to be charged for the operation. For SOL, fee is decided by the blockchain, but default SOL fee is 0.000005. This fee will be only charged on top of the withdrawal amount to the virtual account.
     */
    fee?: string;
    /**
     * Compliance check, if withdrawal is not compliant, it will not be processed.
     */
    compliant?: boolean;
    /**
     * Identifier of the payment, shown for created Transaction within Tatum sender account.
     */
    paymentId?: string;
    /**
     * Note visible to owner of withdrawing account.
     */
    senderNote?: string;
}
