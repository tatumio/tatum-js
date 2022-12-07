/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AdaTx } from './AdaTx';

export type AdaBlock = {
    /**
     * Hash of block.
     */
    hash?: string;
    /**
     * The number of blocks preceding a particular block on a block chain.
     */
    number?: number;
    /**
     * Number of the epoch the block is included in.
     */
    epochNo?: number;
    /**
     * Number of the slot the block is included in.
     */
    slotNo?: number;
    /**
     * The root node of a merkle tree, a descendant of all the hashed pairs in the tree.
     */
    merkleRoot?: string;
    /**
     * Time of the block.
     */
    forgedAt?: string;
    /**
     * Sum of fees paid in the block.
     */
    fees?: number;
    /**
     * Number of the slot in the epoch.
     */
    slotInEpoch?: number;
    transactions?: Array<AdaTx>;
}
