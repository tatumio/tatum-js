/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type TransferXrpKMS = {
    /**
     * Sender account ID
     */
    senderAccountId: string;
    /**
     * XRP account address. Must be the one used for generating deposit tags.
     */
    account: string;
    /**
     * Blockchain address to send assets
     */
    address: string;
    /**
     * Amount to be sent, in XRP.
     */
    amount: string;
    /**
     * Compliance check, if withdrawal is not compliant, it will not be processed.
     */
    compliant?: boolean;
    /**
     * Destination tag of the recipient account, if any. Must be stringified uint32.
     */
    attr?: string;
    /**
     * Source tag of sender account, if any.
     */
    sourceTag?: number;
    /**
     * Identifier of the payment, shown for created Transaction within Tatum sender account.
     */
    paymentId?: string;
    /**
     * Identifier of the secret associated in signing application. Secret, or signature Id must be present.
     */
    signatureId: string;
    /**
     * Note visible to owner of withdrawing account.
     */
    senderNote?: string;
}
