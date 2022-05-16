/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type ChainDeploySolanaKMS = {
    /**
     * Chain to work with.
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
     * Address on the Solana blockchain, where all created tokens will be minted.
     */
    address: string;
    /**
     * Address on the Solana blockchain, from which the token will be deployed.
     */
    from: string;
    /**
     * Identifier of the private key associated in signing application. Private key, or signature Id must be present.
     */
    signatureId: string;
}
