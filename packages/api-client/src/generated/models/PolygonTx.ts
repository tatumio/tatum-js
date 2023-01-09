/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { PolygonTxLog } from './PolygonTxLog';

export type PolygonTx = {
    /**
     * Hash of the block where this transaction was in.
     */
    blockHash?: string;
    /**
     * TRUE if the transaction was successful, FALSE, if the EVM reverted the transaction.
     */
    status?: boolean;
    /**
     * The number of the block that the transaction is included in; if not returned, the transaction has not been included in a block yet.
     */
    blockNumber?: number | null;
    /**
     * Address of the sender.
     */
    from?: string;
    /**
     * Gas provided by the sender.
     */
    gas?: number;
    /**
     * Gas price provided by the sender in wei.
     */
    gasPrice?: string;
    /**
     * Hash of the transaction.
     */
    transactionHash?: string;
    /**
     * The data sent along with the transaction.
     */
    input?: string;
    /**
     * The number of transactions made by the sender prior to this one.
     */
    nonce?: number;
    /**
     * Address of the receiver. 'null' when its a contract creation transaction.
     */
    to?: string;
    /**
     * The integer of the transactions index position in the block; if not returned, the transaction has not been included in a block yet.
     */
    transactionIndex?: number | null;
    /**
     * Value transferred in wei.
     */
    value?: string;
    /**
     * The amount of gas used by this specific transaction alone; if not returned, the transaction has not been included in a block yet.
     */
    gasUsed?: number | null;
    /**
     * The total amount of gas used when this transaction was executed in the block; if not returned, the transaction has not been included in a block yet.
     */
    cumulativeGasUsed?: number | null;
    /**
     * The contract address created, if the transaction was a contract creation, otherwise null.
     */
    contractAddress?: string;
    /**
     * Log events, that happened in this transaction.
     */
    logs?: Array<PolygonTxLog>;
}
