/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { FlareTx } from './FlareTx';

export type FlareBlock = {
    /**
     * Difficulty for this block.
     */
    difficulty?: string;
    /**
     * The 'extra data' field of this block.
     */
    extraData?: string;
    /**
     * The maximum gas allowed in this block.
     */
    gasLimit?: number;
    /**
     * The total used gas by all transactions in this block.
     */
    gasUsed?: number;
    /**
     * Hash of the block. 'null' when its pending block.
     */
    hash?: string;
    /**
     * The bloom filter for the logs of the block. 'null' when its pending block.
     */
    logsBloom?: string;
    /**
     * The address of the beneficiary to whom the mining rewards were given.
     */
    miner?: string;
    mixHash?: string;
    /**
     * Hash of the generated proof-of-work. 'null' when its pending block.
     */
    nonce?: string;
    /**
     * The block number. 'null' when its pending block.
     */
    number?: number;
    /**
     * Hash of the parent block.
     */
    parentHash?: string;
    receiptsRoot?: string;
    /**
     * SHA3 of the uncles data in the block.
     */
    sha3Uncles?: string;
    /**
     * The size of this block in bytes.
     */
    size?: number;
    /**
     * The root of the final state trie of the block.
     */
    stateRoot?: string;
    /**
     * The unix timestamp for when the block was collated.
     */
    timestamp?: number;
    /**
     * Total difficulty of the chain until this block.
     */
    totalDifficulty?: string;
    /**
     * Array of transactions.
     */
    transactions?: Array<FlareTx>;
    /**
     * The root of the transaction trie of the block.
     */
    transactionsRoot?: string;
}
