/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type ChainDeploySolanaSpl = {
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
     * Address on Solana blockchain, where all created SPL tokens will be transferred.
     */
    address: string;
    /**
     * Address on Solana blockchain, from which the fee for the deployment of SPL will be paid.
     */
    from: string;
    /**
     * Address on Solana blockchain which which can freeze token accounts. Default to the 'from'
     */
    freezeAuthority?: string;
    /**
     * Private key of Solana account address, from which the fee for the deployment of SPL will be paid. Private key, or signature Id must be present.
     */
    fromPrivateKey: string;
    /**
     * Address on the Solana blockchain, from which the fee will be paid for transaction. Defaults to from.
     */
    feePayer?: string;
    /**
     * Private key of the fee payer address.
     */
    feePayerPrivateKey?: string;
}
