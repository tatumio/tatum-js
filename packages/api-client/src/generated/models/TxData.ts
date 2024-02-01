/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ChainEnum } from './ChainEnum';
import type { TxSubtype } from './TxSubtype';
import type { TxType } from './TxType';

export type TxData = {
    chain?: ChainEnum;
    /**
     * The transaction hash.
     */
    hash?: string;
    /**
     * The address involved in the transaction.
     */
    address?: string;
    /**
     * The counter address involved in the transaction (optional).
     */
    counterAddress?: string;
    /**
     * The token address involved in the transaction (optional).
     */
    tokenAddress?: string;
    /**
     * The ID of the token involved in the transaction (optional).
     */
    tokenId?: string;
    /**
     * The block number in which the transaction occurred.
     */
    blockNumber?: number;
    /**
     * The transaction index within the block.
     */
    transactionIndex?: number;
    transactionType?: TxType;
    transactionSubtype?: TxSubtype;
    /**
     * The amount transferred in the transaction.
     */
    amount?: string;
    /**
     * The timestamp when the transaction occurred.
     */
    timestamp?: number;
}
