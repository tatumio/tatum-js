/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type NftTx = {
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
     * ID of the token.
     */
    tokenId: string;
    /**
     * Sender
     */
    from: string;
    /**
     * recipient
     */
    to: string;
}
