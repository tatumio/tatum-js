/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { BchTx } from './BchTx';

export type BchBlock = {
    /**
     * Hash of block.
     */
    hash?: string;
    /**
     * Block size.
     */
    size?: number;
    /**
     * The number of blocks preceding a particular block on a block chain.
     */
    height?: number;
    /**
     * Block version.
     */
    version?: number;
    /**
     * The root node of a merkle tree, a descendant of all the hashed pairs in the tree.
     */
    merkleroot?: string;
    /**
     * List of transactions present in the block.
     */
    tx?: Array<BchTx>;
    /**
     * Time of the block.
     */
    time?: number;
    /**
     * Arbitrary number that is used in Bitcoin's proof of work consensus algorithm.
     */
    nonce?: number;
    difficulty?: number;
    /**
     * Number of blocks mined after this block.
     */
    confirmations?: number;
    /**
     * Hash of the previous block.
     */
    previousblockhash?: string;
    /**
     * Hash of the next block.
     */
    nextblockhash?: string;
}
