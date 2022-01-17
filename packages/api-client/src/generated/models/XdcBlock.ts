/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { XdcTx } from './XdcTx';

export type XdcBlock = {
    /**
     * The block number. 'null' when its pending block.
     */
    number?: number;
    /**
     * Hash of the block. 'null' when its pending block.
     */
    hash?: string;
    /**
     * Hash of the parent block.
     */
    parentHash?: string;
    /**
     * Hash of the generated proof-of-work. 'null' when its pending block.
     */
    nonce?: string;
    /**
     * SHA3 of the uncles data in the block.
     */
    sha3Uncles?: string;
    /**
     * The bloom filter for the logs of the block. 'null' when its pending block.
     */
    logsBloom?: string;
    /**
     * The root of the transaction trie of the block.
     */
    transactionsRoot?: string;
    /**
     * The root of the final state trie of the block.
     */
    stateRoot?: string;
    /**
     * The root of the transaction trie of the block.
     */
    receiptsRoot?: string;
    /**
     * The address of the beneficiary to whom the mining rewards were given.
     */
    miner?: string;
    /**
     * Difficulty for this block.
     */
    difficulty?: string;
    /**
     * Total difficulty of the chain until this block.
     */
    totalDifficulty?: string;
    /**
     * The 'extra data' field of this block.
     */
    extraData?: string;
    /**
     * The size of this block in bytes.
     */
    size?: number;
    /**
     * The maximum gas allowed in this block.
     */
    gasLimit?: number;
    /**
     * The total used gas by all transactions in this block.
     */
    gasUsed?: number;
    /**
     * The unix timestamp for when the block was collated.
     */
    timestamp?: number;
    /**
     * Array of transactions.
     */
    transactions?: Array<XdcTx>;
    /**
     * Array of uncle hashes.
     */
    uncles?: Array<string>;
}
