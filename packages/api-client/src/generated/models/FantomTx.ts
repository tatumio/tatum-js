/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type FantomTx = {
    /**
     * Hash of the block where this transaction was in.
     */
    blockHash?: string;
    /**
     * TRUE if the transaction was successful, FALSE, if the EVM reverted the transaction.
     */
    status?: boolean;
    /**
     * Block number where this transaction was in.
     */
    blockNumber?: number;
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
    transactionIndex?: number;
    /**
     * Value transferred in wei.
     */
    value?: string;
    /**
     * The amount of gas used by this specific transaction alone.
     */
    gasUsed?: number;
    /**
     * The total amount of gas used when this transaction was executed in the block.
     */
    cumulativeGasUsed?: number;
    /**
     * The contract address created, if the transaction was a contract creation, otherwise null.
     */
    contractAddress?: string;
    /**
     * Log events, that happened in this transaction.
     */
    logs?: Array<{
        /**
         * From which this event originated from.
         */
        address?: string;
        /**
         * An array with max 4 32 Byte topics, topic 1-3 contains indexed parameters of the log.
         */
        topics?: Array<string>;
        /**
         * The data containing non-indexed log parameter.
         */
        data?: string;
        /**
         * Integer of the event index position in the block.
         */
        logIndex?: number;
        /**
         * Block number where this transaction was in.
         */
        blockNumber?: number;
        /**
         * Hash of the block.
         */
        blockHash?: string;
        /**
         * Integer of the transaction’s index position, the event was created in.
         */
        transactionIndex?: number;
        /**
         * Hash of the transaction this event was created in.
         */
        transactionHash?: string;
    }>;
}
