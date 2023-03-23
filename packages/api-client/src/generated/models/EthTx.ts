/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { EthTxLog } from './EthTxLog';

export type EthTx = {
    /**
     * Hash of the block where this transaction was in.
     */
    blockHash?: string;
    /**
     * Time of the transaction, in UTC seconds.
     */
    timestamp?: number;
    /**
     * TRUE if the transaction was successful, FALSE, if the EVM reverted the transaction.
     */
    status?: boolean;
    /**
     * Block number where this transaction was in.
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
     * Integer of the transactions index position in the block.
     */
    transactionIndex?: number | null;
    /**
     * Value transferred in wei.
     */
    value?: string;
    /**
     * The amount of gas used by this specific transaction alone.
     */
    gasUsed?: number | null;
    /**
     * The total amount of gas used when this transaction was executed in the block.
     */
    cumulativeGasUsed?: number | null;
    /**
     * The contract address created, if the transaction was a contract creation, otherwise null.
     */
    contractAddress?: string;
    /**
     * Log events, that happened in this transaction.
     */
    logs?: Array<EthTxLog>;
}
