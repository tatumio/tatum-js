/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type MultiTx = {
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
     * ID of the token
     */
    tokenId: string;
    /**
     * Amount of tokens transferred.
     */
    amount: string;
    /**
     * Sender
     */
    from: string;
    /**
     * Operator
     */
    operator: string;
    /**
     * recipient
     */
    to: string;
}
