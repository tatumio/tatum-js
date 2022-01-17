/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type FungibleTx = {
    /**
     * Block number
     */
    blockNumber: number;
    /**
     * Transaction ID
     */
    txId: string;
    /**
     * Contract address
     */
    contractAddress: string;
    /**
     * Amount of tokens transferred, in smallest decimals
     */
    amount: string;
    /**
     * Sender
     */
    from: string;
    /**
     * recipient
     */
    to: string;
}
