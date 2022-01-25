/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type TransferAlgorandBlockchain = {
    /**
     * Blockchain sender address.
     */
    from: string;
    /**
     * Blockchain address to send algo
     */
    to: string;
    /**
     * Transaction fee in Algos.
     */
    fee?: string;
    /**
     * Amount to be sent in Algos.
     */
    amount: string;
    /**
     * Helloworld
     */
    note?: string;
    /**
     * Private key of sender address. Private key, or signature Id must be present.
     */
    fromPrivateKey: string;
}
