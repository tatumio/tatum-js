/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AdaTx } from './AdaTx';

export type AdaBlock = {
    /**
     * Hash of block.
     */
    hash?: string;
    /**
     * The number of blocks preceding a particular block on a block chain.
     */
    number?: number;
    /**
     * Number of the epoch the block is included in.
     */
    epochNo?: number;
    /**
     * Number of the slot the block is included in.
     */
    slotNo?: number;
    /**
     * Time of the block.
     */
    forgedAt?: string;
    transactions?: Array<AdaTx>;
}
