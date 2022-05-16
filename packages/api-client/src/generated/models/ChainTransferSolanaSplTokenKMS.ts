/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type ChainTransferSolanaSplTokenKMS = {
    /**
     * Chain to work with.
     */
    chain: 'SOL';
    /**
     * Address on the Solana blockchain, where all tokens will be transferred.
     */
    to: string;
    /**
     * Identifier of the private key associated in signing application. Private key, or signature Id must be present.
     */
    signatureId?: string;
    /**
     * Address on the Solana blockchain, from which the token will be deployed.
     */
    from?: string;
    /**
     * Amount to be sent.
     */
    amount: string;
    /**
     * Address of SPL token
     */
    contractAddress: string;
    /**
     * Number of decimal points that SPL token has.
     */
    digits: number;
}
