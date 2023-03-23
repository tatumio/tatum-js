/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type FlowTransactionPK = {
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
     * Secret for account. Secret, or signature Id must be present.
     */
    privateKey: string;
}
