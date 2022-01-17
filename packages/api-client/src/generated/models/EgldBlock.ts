/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { EgldShardBlock } from './EgldShardBlock';
import type { EgldTx } from './EgldTx';

export type EgldBlock = {
    /**
     * The block height.
     */
    nonce?: number;
    /**
     * The round number.
     */
    round?: number;
    /**
     * Hash of the block.
     */
    hash?: string;
    /**
     * Hash of the previous block.
     */
    prevBlockHash?: string;
    /**
     * An epoch is a sequence of consecutive rounds during which the configuration of the network does not change (currently aprox. 24 hrs in length).
     */
    epoch?: number;
    /**
     * Number of transactions in current block.
     */
    numTxs?: number;
    /**
     * Array of shard blocks
     */
    shardBlocks?: Array<EgldShardBlock>;
    /**
     * Array of transactions.
     */
    transactions?: Array<EgldTx>;
}
