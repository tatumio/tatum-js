/**
 *
 * @export
 * @interface DogeBlock
 */
import {DogeTx} from './DogeTx';

export interface DogeBlock {
    /**
     * Hash of block.
     * @type {string}
     * @memberof DogeBlock
     */
    hash: string;
    /**
     * The number of blocks preceding a particular block on a block chain.
     * @type {number}
     * @memberof DogeBlock
     */
    height: number;
    /**
     * The number of blocks after this block.
     * @type {number}
     * @memberof DogeBlock
     */
    confirmations: number;
    /**
     * Size of the block.
     * @type {number}
     * @memberof DogeBlock
     */
    size: number;
    /**
     * The weight of the block.
     * @type {number}
     * @memberof DogeBlock
     */
    weight: number;
    /**
     * Block version.
     * @type {number}
     * @memberof DogeBlock
     */
    version: number;
    /**
     * Hash of the previous block.
     * @type {string}
     * @memberof DogeBlock
     */
    previousblockhash: string;
    /**
     * The root node of a merkle tree, a descendant of all the hashed pairs in the tree.
     * @type {string}
     * @memberof DogeBlock
     */
    merkleRoot: string;
    /**
     * Time of the block.
     * @type {number}
     * @memberof DogeBlock
     */
    time: number;
    /**
     *
     * @type {number}
     * @memberof DogeBlock
     */
    bits: string;
    /**
     * Arbitrary number that is used in Litecoin's proof of work consensus algorithm.
     * @type {number}
     * @memberof DogeBlock
     */
    nonce: number;
    /**
     *
     * @type {Array<DogeTx>}
     * @memberof DogeBlock
     */
    txs: DogeTx[];
}
