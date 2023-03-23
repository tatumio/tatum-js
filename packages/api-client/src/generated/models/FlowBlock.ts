/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type FlowBlock = {
    /**
     * The hash of the block
     */
    id?: string;
    /**
     * The hash of the parent block
     */
    parentId?: string;
    /**
     * The number of the block
     */
    height?: number;
    /**
     * The timestamp of the block
     */
    timestamp?: string;
    /**
     * Collection guaranties
     */
    collectionGuarantees?: Array<{
        /**
         * The collection guarantee
         */
        collectionId?: string;
    }>;
    /**
     * Block seals
     */
    blockSeals?: Array<{
        /**
         * The ID of the block being sealed
         */
        blockId?: string;
        /**
         * The ID of the execution receipt being sealed
         */
        executionReceiptId?: string;
    }>;
    /**
     * The IDs of transactions
     */
    transactions?: Array<string>;
}
