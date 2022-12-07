/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type TransferSolanaBlockchainKMS = {
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
     * Identifier of the private key associated in signing application. Private key, or signature Id must be present.
     */
    signatureId: string;
}
