/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type TransferFlowKMS = {
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
     * Amount to be sent, in Flow.
     */
    amount: string;
    /**
     * Identifier of the secret associated in signing application. Secret, or signature Id must be present.
     */
    signatureId: string;
    /**
     * If signatureId is mnemonic-based, this is the index to the specific address from that mnemonic.
     */
    index?: number;
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
