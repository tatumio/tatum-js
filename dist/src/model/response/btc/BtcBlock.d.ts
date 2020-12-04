import { BtcTx } from './BtcTx';
/**
 *
 * @export
 * @interface BtcBlock
 */
export interface BtcBlock {
    /**
     * Hash of block.
     * @type {string}
     * @memberof BtcBlock
     */
    hash: string;
    /**
     * The number of blocks preceding a particular block on a block chain.
     * @type {number}
     * @memberof BtcBlock
     */
    height: number;
    /**
     * The number of blocks following a particular block on a block chain, including current one.
     * @type {number}
     * @memberof BtcBlock
     */
    depth: number;
    /**
     * Block version.
     * @type {number}
     * @memberof BtcBlock
     */
    version: number;
    /**
     * Hash of the previous block.
     * @type {string}
     * @memberof BtcBlock
     */
    prevBlock: string;
    /**
     * The root node of a merkle tree, a descendant of all the hashed pairs in the tree.
     * @type {string}
     * @memberof BtcBlock
     */
    merkleRoot: string;
    /**
     * Time of the block.
     * @type {number}
     * @memberof BtcBlock
     */
    time: number;
    /**
     *
     * @type {number}
     * @memberof BtcBlock
     */
    bits: number;
    /**
     * Arbitrary number that is used in Bitcoin's proof of work consensus algorithm.
     * @type {number}
     * @memberof BtcBlock
     */
    nonce: number;
    /**
     *
     * @type {Array<BtcTx>}
     * @memberof BtcBlock
     */
    txs: BtcTx[];
}
