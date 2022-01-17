/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type QuorumTx = {
    /**
     * Hash of the block where this transaction was in.
     */
    blockHash?: string;
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
    hash?: string;
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
}
