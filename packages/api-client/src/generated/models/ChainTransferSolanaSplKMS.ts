/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type ChainTransferSolanaSplKMS = {
    /**
     * Chain to work with.
     */
    chain: 'SOL';
    /**
     * Address on Solana blockchain, where SPL tokens will be transferred.
     */
    to: string;
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
    /**
     * Address on the Solana blockchain, from which the token will be transferred.
     */
    from: string;
    /**
     * Identifier of the private key associated in signing application. Private key, or signature Id must be present.
     */
    signatureId: string;
}
