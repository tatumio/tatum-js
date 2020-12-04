/**
 *
 * @export
 * @interface LtcBlock
 */
import { LtcTx } from './LtcTx';
export interface LtcBlock {
    /**
     * Hash of block.
     * @type {string}
     * @memberof LtcBlock
     */
    hash: string;
    /**
     * The number of blocks preceding a particular block on a block chain.
     * @type {number}
     * @memberof LtcBlock
     */
    height: number;
    /**
     * Block version.
     * @type {number}
     * @memberof LtcBlock
     */
    version: number;
    /**
     * Hash of the previous block.
     * @type {string}
     * @memberof LtcBlock
     */
    prevBlock: string;
    /**
     * The root node of a merkle tree, a descendant of all the hashed pairs in the tree.
     * @type {string}
     * @memberof LtcBlock
     */
    merkleRoot: string;
    /**
     * Time of the block.
     * @type {number}
     * @memberof LtcBlock
     */
    ts: number;
    /**
     *
     * @type {number}
     * @memberof LtcBlock
     */
    bits: number;
    /**
     * Arbitrary number that is used in Litecoin's proof of work consensus algorithm.
     * @type {number}
     * @memberof LtcBlock
     */
    nonce: number;
    /**
     *
     * @type {Array<LtcTx>}
     * @memberof LtcBlock
     */
    txs: LtcTx[];
}
