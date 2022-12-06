/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type ChainDeploySolanaSplKMS = {
    /**
     * The blockchain to work with
     */
    chain: 'SOL';
    /**
     * Initial supply of SPL token.
     */
    supply: string;
    /**
     * Number of decimal points
     */
    digits: number;
    /**
     * Address on Solana blockchain, where all created SPL tokens will be transferred.
     */
    address: string;
    /**
     * Address on Solana blockchain, from which the fee for the deployment of SPL will be paid.
     */
    from: string;
    /**
     * Identifier of the private key associated in signing application. Private key, or signature Id must be present.
     */
    signatureId: string;
}
