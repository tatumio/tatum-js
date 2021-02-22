/**
 *
 * @export
 * @interface QuorumBlock
 */
import {QuorumTx} from './QuorumTx';

export interface QuorumBlock {
    /**
     * Difficulty for this block.
     * @type {number}
     * @memberof QuorumBlock
     */
    difficulty: number;
    /**
     * The 'extra data' field of this block.
     * @type {string}
     * @memberof QuorumBlock
     */
    extraData: string;
    /**
     * The maximum gas allowed in this block.
     * @type {number}
     * @memberof QuorumBlock
     */
    gasLimit: number;
    /**
     * The total used gas by all transactions in this block.
     * @type {number}
     * @memberof QuorumBlock
     */
    gasUsed: number;
    /**
     * Hash of the block. 'null' when its pending block.
     * @type {string}
     * @memberof QuorumBlock
     */
    hash: string;
    /**
     * The bloom filter for the logs of the block. 'null' when its pending block.
     * @type {string}
     * @memberof QuorumBlock
     */
    logsBloom: string;
    /**
     * The address of the beneficiary to whom the mining rewards were given.
     * @type {string}
     * @memberof QuorumBlock
     */
    miner: string;
    /**
     * Hash of the generated proof-of-work. 'null' when its pending block.
     * @type {string}
     * @memberof QuorumBlock
     */
    nonce: string;
    /**
     * The block number. 'null' when its pending block.
     * @type {number}
     * @memberof QuorumBlock
     */
    number: number;
    /**
     * Hash of the parent block.
     * @type {string}
     * @memberof QuorumBlock
     */
    parentHash: string;
    /**
     * SHA3 of the uncles data in the block.
     * @type {string}
     * @memberof QuorumBlock
     */
    sha3Uncles: string;
    /**
     * The size of this block in bytes.
     * @type {number}
     * @memberof QuorumBlock
     */
    size: number;
    /**
     * The root of the final state trie of the block.
     * @type {string}
     * @memberof QuorumBlock
     */
    stateRoot: string;
    /**
     * The unix timestamp for when the block was collated.
     * @type {number}
     * @memberof QuorumBlock
     */
    timestamp: number;
    /**
     * Total difficulty of the chain until this block.
     * @type {number}
     * @memberof QuorumBlock
     */
    totalDifficulty: number;
    /**
     * Array of transactions.
     * @type {Array<EthTx>}
     * @memberof QuorumBlock
     */
    transactions: QuorumTx[];
    /**
     * The uncles of the block.
     * @type {Array<any>}
     * @memberof QuorumBlock
     */
    uncles: any[];
}
