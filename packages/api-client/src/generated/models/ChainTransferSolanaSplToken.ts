/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type ChainTransferSolanaSplToken = {
    /**
     * Chain to work with.
     */
    chain: 'SOL';
    /**
     * Address on the Solana blockchain, from which the token will be deployed.
     */
    from: string;
    /**
     * Address on the Solana blockchain, where all tokens will be transferred.
     */
    to: string;
    /**
     * Private key of Solana account address, from which the fee for the deployment of SPL will be paid. Private key, or signature Id must be present.
     */
    fromPrivateKey: string;
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
