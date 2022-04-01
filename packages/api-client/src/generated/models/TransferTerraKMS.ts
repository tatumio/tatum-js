/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type TransferTerraKMS = {
    /**
     * Sender account ID
     */
    senderAccountId: string;
    /**
     * Blockchain address to send assets
     */
    address: string;
    /**
     * Amount to be sent, in LUNA, LUNA_USD or LUNA_KRW.
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
     * Fee to be charged for the operation. This fee will be charged on top of the withdrawal amount to the virtual account.
     */
    fee?: string;
    /**
     * Identifier of the payment, shown for created Transaction within Tatum sender account.
     */
    paymentId?: string;
    /**
     * Identifier of the secret associated in signing application. Secret, or signature Id must be present.
     */
    signatureId: string;
    /**
     * Blockchain address to send from.
     */
    fromAddress: string;
    /**
     * Note visible to owner of withdrawing account.
     */
    senderNote?: string;
}
