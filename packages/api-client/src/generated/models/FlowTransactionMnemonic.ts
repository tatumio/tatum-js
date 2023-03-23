/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type FlowTransactionMnemonic = {
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
     * Mnemonic to generate private key.
     */
    mnemonic: string;
    /**
     * Index to the specific address from mnemonic.
     */
    index: number;
}
