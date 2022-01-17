/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { TronTx } from './TronTx';

export type TronBlock = {
    /**
     * Block hash
     */
    hash?: string;
    /**
     * Block number.
     */
    blockNumber?: number;
    /**
     * Time of the block in UTC millis.
     */
    timestamp?: number;
    /**
     * Hash of the parent block.
     */
    parentHash?: string;
    /**
     * Witness address.
     */
    witnessAddress?: string;
    /**
     * Witness signature.
     */
    witnessSignature?: string;
    /**
     * Transactions that occurs in this block.
     */
    transactions?: Array<TronTx>;
}
