/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { DogeTx } from './DogeTx';

export type DogeBlock = {
    /**
     * Hash of block.
     */
    hash?: string;
    /**
     * The number of blocks preceding a particular block on a block chain.
     */
    height?: number;
    /**
     * The size of the block.
     */
    size?: number;
    /**
     * Number of confirmations of that block.
     */
    confirmations?: number;
    /**
     * The weight of the block.
     */
    weight?: number;
    /**
     * Block version.
     */
    version?: number;
    /**
     * Hash of the previous block.
     */
    previousblockhash?: string;
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
     * Arbitrary number that is used in Litecoin's proof of work consensus algorithm.
     */
    nonce?: number;
    txs?: Array<DogeTx>;
}
