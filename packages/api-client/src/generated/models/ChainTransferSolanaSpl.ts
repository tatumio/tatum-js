/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type ChainTransferSolanaSpl = {
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
     * Private key of sender address. Private key, or signature Id must be present.
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
