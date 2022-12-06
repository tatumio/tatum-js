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
     * Fee paid for this transaction, in ADA.
     */
    fee?: string;
    block?: {
        /**
         * Index of the block this transaction belongs to.
         */
        number?: number;
        /**
         * Block hash.
         */
        hash?: string;
    };
    /**
     * List of transactions, from which assets are being sent.
     */
    inputs?: Array<{
        /**
         * Transaction hash of the input.
         */
        txHash?: string;
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
