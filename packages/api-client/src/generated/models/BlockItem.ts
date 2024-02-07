/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type BlockItem = {
    /**
     * The block number in the blockchain.
     */
    blockNumber?: number;
    /**
     * The timestamp when the block was created, in milliseconds since Unix epoch.
     */
    blockTimestamp?: number;
    /**
     * The hash of the block.
     */
    hash?: string;
    /**
     * The number of ingested events in the block.
     */
    eventIngestedSize?: number;
    /**
     * The number of ingested NFTs in the block.
     */
    nftIngestedSize?: number;
    /**
     * The array of transaction hashes included in the block.
     */
    txHashes?: Array<string>;
}
