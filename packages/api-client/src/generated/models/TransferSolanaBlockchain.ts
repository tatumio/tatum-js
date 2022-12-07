/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type TransferSolanaBlockchain = {
    /**
     * Blockchain address to send assets from
     */
    from: string;
    /**
     * Blockchain address to send assets to
     */
    to: string;
    /**
     * Amount to be sent in SOL.
     */
    amount: string;
    /**
     * Private key of sender address. Private key, or signature Id must be present.
     */
    fromPrivateKey: string;
}
