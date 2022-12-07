/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AdaUTXO } from './AdaUTXO';

export type AdaTx = {
    /**
     * Transaction hash.
     */
    hash?: string;
    /**
     * Fee paid for this transaction, in LTC.
     */
    fee?: string;
    /**
     * Index of the block this transaction belongs to.
     */
    block?: number;
    /**
     * Time of the transaction.
     */
    includedAt?: string;
    /**
     * List of transactions, from which assets are being sent.
     */
    inputs?: Array<{
        /**
         * Transaction hash of the input.
         */
        txHash?: string;
        /**
         * Transaction hash of the source transaction input.
         */
        sourceTxHash?: string;
        /**
         * Transaction index of the input.
         */
        sourceTxIndex?: number;
        /**
         * Value of the transaction, in Lovelace - 1/1000000 of ADA.
         */
        value?: string;
        /**
         * Sender address.
         */
        address?: string;
    }>;
    /**
     * List of recipient addresses and amounts to send to each of them.
     */
    outputs?: Array<AdaUTXO>;
}
