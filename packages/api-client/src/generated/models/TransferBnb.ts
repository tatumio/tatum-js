/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type TransferBnb = {
    /**
     * Sender account ID
     */
    senderAccountId: string;
    /**
     * Blockchain address to send assets
     */
    address: string;
    /**
     * Amount to be sent, in BNB.
     */
    amount: string;
    /**
     * Compliance check, if withdrawal is not compliant, it will not be processed.
     */
    compliant?: boolean;
    /**
     * Memo of the recipient account, if any.
     */
    attr?: string;
    /**
     * Identifier of the payment, shown for created Transaction within Tatum sender account.
     */
    paymentId?: string;
    /**
     * Private key of sender address.
     */
    fromPrivateKey: string;
    /**
     * Note visible to owner of withdrawing account.
     */
    senderNote?: string;
}
