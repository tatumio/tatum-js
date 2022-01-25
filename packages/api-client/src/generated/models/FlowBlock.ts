/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type FlowBlock = {
    /**
     * Hash of the block.
     */
    id?: string;
    /**
     * Hash of the parent block.
     */
    parentId?: string;
    /**
     * The block number.
     */
    height?: number;
    /**
     * Timestamp of the block.
     */
    timestamp?: string;
    /**
     * Array of transaction IDs.
     */
    transactions?: Array<string>;
    /**
     * Array of signatures.
     */
    signatures?: Array<string>;
    /**
     * Array of block seals.
     */
    blockSeals?: Array<{
        blockId?: string;
        executionReceiptSignatures?: Array<string>;
        executionReceiptId?: string;
        resultApprovalSignatures?: Array<string>;
    }>;
}
