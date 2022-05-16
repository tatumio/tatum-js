/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type ChainDeploySolana = {
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
     * Private key of Solana account address, from which the fee for the deployment of SPL will be paid. Private key, or signature Id must be present.
     */
    fromPrivateKey: string;
}
