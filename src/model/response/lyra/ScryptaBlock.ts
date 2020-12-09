import {ScryptaTx} from './ScryptaTx';

/**
 *
 * @export
 * @interface ScryptaBlock
 */
export interface ScryptaBlock {
    /**
     * Hash of block.
     * @type {string}
     * @memberof ScryptaBlock
     */
    hash: string;
    /**
     * The number of blocks preceding a particular block on a block chain.
     * @type {number}
     * @memberof ScryptaBlock
     */
    height: number;
    /**
     * The number of blocks following a particular block on a block chain, including current one.
     * @type {number}
     * @memberof ScryptaBlock
     */
    depth: number;
    /**
     * Block version.
     * @type {number}
     * @memberof ScryptaBlock
     */
    version: number;
    /**
     * Hash of the previous block.
     * @type {string}
     * @memberof ScryptaBlock
     */
    prevBlock: string;
    /**
     * The root node of a merkle tree, a descendant of all the hashed pairs in the tree.
     * @type {string}
     * @memberof ScryptaBlock
     */
    merkleRoot: string;
    /**
     * Time of the block.
     * @type {number}
     * @memberof ScryptaBlock
     */
    time: number;
    /**
     *
     * @type {number}
     * @memberof ScryptaBlock
     */
    bits: number;
    /**
     * Arbitrary number that is used in Bitcoin's proof of work consensus algorithm.
     * @type {number}
     * @memberof ScryptaBlock
     */
    nonce: number;
    /**
     *
     * @type {Array<ScryptaTx>}
     * @memberof ScryptaBlock
     */
    txs: ScryptaTx[];
}