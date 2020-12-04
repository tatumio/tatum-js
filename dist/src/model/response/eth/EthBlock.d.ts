/**
 *
 * @export
 * @interface EthBlock
 */
import { EthTx } from './EthTx';
export interface EthBlock {
    /**
     * Difficulty for this block.
     * @type {string}
     * @memberof EthBlock
     */
    difficulty: string;
    /**
     * The 'extra data' field of this block.
     * @type {string}
     * @memberof EthBlock
     */
    extraData: string;
    /**
     * The maximum gas allowed in this block.
     * @type {number}
     * @memberof EthBlock
     */
    gasLimit: number;
    /**
     * The total used gas by all transactions in this block.
     * @type {number}
     * @memberof EthBlock
     */
    gasUsed: number;
    /**
     * Hash of the block. 'null' when its pending block.
     * @type {string}
     * @memberof EthBlock
     */
    hash: string;
    /**
     * The bloom filter for the logs of the block. 'null' when its pending block.
     * @type {string}
     * @memberof EthBlock
     */
    logsBloom: string;
    /**
     * The address of the beneficiary to whom the mining rewards were given.
     * @type {string}
     * @memberof EthBlock
     */
    miner: string;
    /**
     *
     * @type {string}
     * @memberof EthBlock
     */
    mixHash: string;
    /**
     * Hash of the generated proof-of-work. 'null' when its pending block.
     * @type {string}
     * @memberof EthBlock
     */
    nonce: string;
    /**
     * The block number. 'null' when its pending block.
     * @type {number}
     * @memberof EthBlock
     */
    number: number;
    /**
     * Hash of the parent block.
     * @type {string}
     * @memberof EthBlock
     */
    parentHash: string;
    /**
     *
     * @type {string}
     * @memberof EthBlock
     */
    receiptsRoot: string;
    /**
     * SHA3 of the uncles data in the block.
     * @type {string}
     * @memberof EthBlock
     */
    sha3Uncles: string;
    /**
     * The size of this block in bytes.
     * @type {number}
     * @memberof EthBlock
     */
    size: number;
    /**
     * The root of the final state trie of the block.
     * @type {string}
     * @memberof EthBlock
     */
    stateRoot: string;
    /**
     * The unix timestamp for when the block was collated.
     * @type {number}
     * @memberof EthBlock
     */
    timestamp: number;
    /**
     * Total difficulty of the chain until this block.
     * @type {string}
     * @memberof EthBlock
     */
    totalDifficulty: string;
    /**
     * Array of transactions.
     * @type {Array<EthTx>}
     * @memberof EthBlock
     */
    transactions: EthTx[];
    /**
     * The root of the transaction trie of the block.
     * @type {string}
     * @memberof EthBlock
     */
    transactionsRoot: string;
}
