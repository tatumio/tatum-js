/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type ChainTransferAlgoErc20 = {
    /**
     * The blockchain to work with
     */
    chain: 'ALGO';
    /**
     * The blockchain address to send the fungible tokens to
     */
    to: string;
    /**
     * The asset ID (the ID of the fungible tokens)
     */
    contractAddress: string;
    /**
     * The amount of the fungible tokens to be sent
     */
    amount: string;
    /**
     * The number of decimal places that the fungible tokens have
     */
    digits: number;
    /**
     * The private key of the blockchain address from which the fee will be deducted
     */
    fromPrivateKey: string;
}
