/**
 *
 * @export
 * @interface QuorumTx
 */
export interface QuorumTx {
    /**
     * Hash of the block where this transaction was in.
     * @type {string}
     * @memberof QuorumTx
     */
    blockHash: string;
    /**
     * Block number where this transaction was in.
     * @type {number}
     * @memberof QuorumTx
     */
    blockNumber: number;
    /**
     * Address of the sender.
     * @type {string}
     * @memberof QuorumTx
     */
    from: string;
    /**
     * Gas provided by the sender.
     * @type {number}
     * @memberof QuorumTx
     */
    gas: number;
    /**
     * Gas price provided by the sender in wei.
     * @type {number}
     * @memberof QuorumTx
     */
    gasPrice: number;
    /**
     * Hash of the transaction.
     * @type {string}
     * @memberof QuorumTx
     */
    hash: string;
    /**
     * The data sent along with the transaction.
     * @type {string}
     * @memberof QuorumTx
     */
    input: string;
    /**
     * The number of transactions made by the sender prior to this one.
     * @type {number}
     * @memberof QuorumTx
     */
    nonce: number;
    /**
     * Address of the receiver. 'null' when its a contract creation transaction.
     * @type {string}
     * @memberof QuorumTx
     */
    to: string;
    /**
     * Integer of the transactions index position in the block.
     * @type {number}
     * @memberof QuorumTx
     */
    transactionIndex: number;
    /**
     * Value transferred in wei.
     * @type {string}
     * @memberof QuorumTx
     */
    value: string;
}
