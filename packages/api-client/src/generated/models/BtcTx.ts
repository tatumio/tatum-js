/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { BtcTxInput } from './BtcTxInput';
import type { BtcTxOutput } from './BtcTxOutput';

export type BtcTx = {
    /**
     * Transaction hash.
     */
    hash?: string;
    /**
     * Transaction hex.
     */
    hex?: string;
    /**
     * Witness hash in case of a SegWit transaction.
     */
    witnessHash?: string;
    /**
     * Fee paid for this transaction, in satoshis.
     */
    fee?: number;
    rate?: number;
    mtime?: number;
    /**
     * Height of the block this transaction belongs to.
     */
    blockNumber?: number;
    /**
     * Hash of the block this transaction belongs to.
     */
    block?: string;
    /**
     * Time of the transaction.
     */
    time?: number;
    /**
     * Index of the transaction in the block.
     */
    index?: number;
    /**
     * Index of the transaction.
     */
    version?: number;
    /**
     * List of transactions, from which assets are being sent.
     */
    inputs?: Array<BtcTxInput>;
    /**
     * List of recipient addresses and amounts to send to each of them.
     */
    outputs?: Array<BtcTxOutput>;
    /**
     * Block this transaction was included in.
     */
    locktime?: number;
}
