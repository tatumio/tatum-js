/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type FlowTransactionKMS = {
    /**
     * Blockchain account to send from
     */
    account: string;
    /**
     * Type of asset to send
     */
    currency: 'FLOW' | 'FUSD';
    /**
     * Blockchain address to send assets
     */
    to: string;
    /**
     * Amount to be sent
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
}
