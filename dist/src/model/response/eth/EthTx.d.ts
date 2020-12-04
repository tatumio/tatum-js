/**
 *
 * @export
 * @interface EthTx
 */
export interface EthTx {
    /**
     * Hash of the block where this transaction was in.
     * @type {string}
     * @memberof EthTx
     */
    blockHash: string;
    /**
     * TRUE if the transaction was successful, FALSE, if the EVM reverted the transaction.
     * @type {boolean}
     * @memberof EthTx
     */
    status: boolean;
    /**
     * Block number where this transaction was in.
     * @type {number}
     * @memberof EthTx
     */
    blockNumber: number;
    /**
     * Address of the sender.
     * @type {string}
     * @memberof EthTx
     */
    from: string;
    /**
     * Gas provided by the sender.
     * @type {number}
     * @memberof EthTx
     */
    gas: number;
    /**
     * Gas price provided by the sender in wei.
     * @type {string}
     * @memberof EthTx
     */
    gasPrice: string;
    /**
     * Hash of the transaction.
     * @type {string}
     * @memberof EthTx
     */
    transactionHash: string;
    /**
     * The data sent along with the transaction.
     * @type {string}
     * @memberof EthTx
     */
    input: string;
    /**
     * The number of transactions made by the sender prior to this one.
     * @type {number}
     * @memberof EthTx
     */
    nonce: number;
    /**
     * Address of the receiver. 'null' when its a contract creation transaction.
     * @type {string}
     * @memberof EthTx
     */
    to: string;
    /**
     * Integer of the transactions index position in the block.
     * @type {number}
     * @memberof EthTx
     */
    transactionIndex: number;
    /**
     * Value transferred in wei.
     * @type {string}
     * @memberof EthTx
     */
    value: string;
    /**
     * The amount of gas used by this specific transaction alone.
     * @type {number}
     * @memberof EthTx
     */
    gasUsed: number;
    /**
     * The total amount of gas used when this transaction was executed in the block.
     * @type {number}
     * @memberof EthTx
     */
    cumulativeGasUsed: number;
    /**
     * The contract address created, if the transaction was a contract creation, otherwise null.
     * @type {string}
     * @memberof EthTx
     */
    contractAddress: string;
    /**
     * Log events, that happened in this transaction.
     * @type {Array<EthTxLogs>}
     * @memberof EthTx
     */
    logs: EthTxLogs[];
}
/**
 *
 * @export
 * @interface EthTxLogs
 */
export interface EthTxLogs {
    /**
     * From which this event originated from.
     * @type {string}
     * @memberof EthTxLogs
     */
    address: string;
    /**
     * An array with max 4 32 Byte topics, topic 1-3 contains indexed parameters of the log.
     * @type {Array<string>}
     * @memberof EthTxLogs
     */
    topic: string[];
    /**
     * The data containing non-indexed log parameter.
     * @type {string}
     * @memberof EthTxLogs
     */
    data: string;
    /**
     * Integer of the event index position in the block.
     * @type {number}
     * @memberof EthTxLogs
     */
    logIndex: number;
    /**
     * Integer of the transaction’s index position, the event was created in.
     * @type {number}
     * @memberof EthTxLogs
     */
    transactionIndex: number;
    /**
     * Hash of the transaction this event was created in.
     * @type {string}
     * @memberof EthTxLogs
     */
    transactionHash: string;
}
