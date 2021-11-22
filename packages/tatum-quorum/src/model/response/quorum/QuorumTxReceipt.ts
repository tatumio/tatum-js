/**
 *
 * @export
 * @interface QuorumTxReceipt
 */
export interface QuorumTxReceipt {
  /**
   * Hash of the block where this transaction was in.
   * @type {string}
   * @memberof QuorumTxReceipt
   */
  blockHash: string
  /**
   * TRUE if the transaction was successful, FALSE, if the EVM reverted the transaction.
   * @type {boolean}
   * @memberof QuorumTxReceipt
   */
  status: boolean
  /**
   * Block number where this transaction was in.
   * @type {number}
   * @memberof QuorumTxReceipt
   */
  blockNumber: number
  /**
   * Address of the sender.
   * @type {string}
   * @memberof QuorumTxReceipt
   */
  from: string
  /**
   * Hash of the transaction.
   * @type {string}
   * @memberof QuorumTxReceipt
   */
  transactionHash: string
  /**
   * Address of the receiver. 'null' when its a contract creation transaction.
   * @type {string}
   * @memberof QuorumTxReceipt
   */
  to: string
  /**
   * Integer of the transactions index position in the block.
   * @type {number}
   * @memberof QuorumTxReceipt
   */
  transactionIndex: number
  /**
   * The amount of gas used by this specific transaction alone.
   * @type {number}
   * @memberof QuorumTxReceipt
   */
  gasUsed: number
  /**
   * The total amount of gas used when this transaction was executed in the block.
   * @type {number}
   * @memberof QuorumTxReceipt
   */
  cumulativeGasUsed: number
  /**
   * The contract address created, if the transaction was a contract creation, otherwise null.
   * @type {string}
   * @memberof QuorumTxReceipt
   */
  contractAddress: string
  /**
   * Log events, that happened in this transaction.
   * @type {Array<QuorumTxLogs>}
   * @memberof QuorumTxReceipt
   */
  logs: QuorumTxLogs[]
  /**
   * The bloom filter for the logs of the block. 'null' when its pending transaction.
   * @type {string}
   * @memberof QuorumTxReceipt
   */
  logsBloom: string
}

/**
 *
 * @export
 * @interface QuorumTxLogs
 */
export interface QuorumTxLogs {
  /**
   * From which this event originated from.
   * @type {string}
   * @memberof QuorumTxLogs
   */
  address: string
  /**
   * An array with max 4 32 Byte topics, topic 1-3 contains indexed parameters of the log.
   * @type {Array<string>}
   * @memberof QuorumTxLogs
   */
  topic: string[]
  /**
   * The data containing non-indexed log parameter.
   * @type {string}
   * @memberof QuorumTxLogs
   */
  data: string
  /**
   * Integer of the event index position in the block.
   * @type {number}
   * @memberof QuorumTxLogs
   */
  logIndex: number
  /**
   * Integer of the transaction’s index position, the event was created in.
   * @type {number}
   * @memberof QuorumTxLogs
   */
  transactionIndex: number
  /**
   * Hash of the transaction this event was created in.
   * @type {string}
   * @memberof QuorumTxLogs
   */
  transactionHash: string
}
