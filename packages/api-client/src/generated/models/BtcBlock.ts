/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { BtcTx } from './BtcTx';

export type BtcBlock = {
    /**
     * Hash of block.
     */
    hash?: string;
    /**
     * The number of blocks preceding a particular block on a block chain.
     */
    height?: number;
    /**
     * The number of blocks following a particular block on a block chain, including current one.
     */
    depth?: number;
    /**
     * Block version.
     */
    version?: number;
    /**
     * Hash of the previous block.
     */
    prevBlock?: string;
    /**
     * The root node of a merkle tree, a descendant of all the hashed pairs in the tree.
     */
    merkleRoot?: string;
    /**
     * Time of the block.
     */
    time?: number;
    bits?: number;
    /**
     * Arbitrary number that is used in Bitcoin's proof of work consensus algorithm.
     */
    nonce?: number;
    txs?: Array<BtcTx>;
}
