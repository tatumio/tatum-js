/**
 *
 * @export
 * @interface BchBlock
 */
import { BchTx } from './BchTx';
export interface BchBlock {
    /**
     * Hash of block.
     * @type {string}
     * @memberof BchBlock
     */
    hash: string;
    /**
     * Block size.
     * @type {number}
     * @memberof BchBlock
     */
    size: number;
    /**
     * The number of blocks preceding a particular block on a block chain.
     * @type {number}
     * @memberof BchBlock
     */
    height: number;
    /**
     * Block version.
     * @type {number}
     * @memberof BchBlock
     */
    version: number;
    /**
     * The root node of a merkle tree, a descendant of all the hashed pairs in the tree.
     * @type {string}
     * @memberof BchBlock
     */
    merkleroot: string;
    /**
     * List of transactions present in the block.
     * @type {Array<BchTx>}
     * @memberof BchBlock
     */
    tx: BchTx[];
    /**
     * Time of the block.
     * @type {number}
     * @memberof BchBlock
     */
    time: number;
    /**
     * Arbitrary number that is used in Bitcoin's proof of work consensus algorithm.
     * @type {number}
     * @memberof BchBlock
     */
    nonce: number;
    /**
     *
     * @type {number}
     * @memberof BchBlock
     */
    difficulty: number;
    /**
     * Number of blocks mined after this block.
     * @type {number}
     * @memberof BchBlock
     */
    confirmations: number;
    /**
     * Hash of the previous block.
     * @type {string}
     * @memberof BchBlock
     */
    previousblockhash: string;
    /**
     * Hash of the next block.
     * @type {string}
     * @memberof BchBlock
     */
    nextblockhash: string;
}
