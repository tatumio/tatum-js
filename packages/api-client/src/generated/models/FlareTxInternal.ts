/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type FlareTxInternal = {
    /**
     * Address of the sender.
     */
    from?: string;
    /**
     * Address of the receiver. 'null' when its a contract creation transaction.
     */
    to?: string;
    /**
     * Value transferred in wei.
     */
    value?: string;
    /**
     * Block number where this transaction was in.
     */
    blockNumber?: number;
    /**
     * Time of the transaction in seconds.
     */
    timeStamp?: string;
    /**
     * Hash of the transaction.
     */
    hash?: string;
    /**
     * The data sent along with the transaction.
     */
    input?: string;
    /**
     * Trace ID.
     */
    traceId?: string;
    /**
     * Type of the transaction.
     */
    type?: string;
    /**
     * Error code.
     */
    errCode?: string;
    /**
     * Gas provided by the sender.
     */
    gas?: number;
    /**
     * 1 if the transaction was not successful, 0 otherwise.
     */
    isError?: string;
    /**
     * The amount of gas used by this specific transaction alone.
     */
    gasUsed?: number;
    /**
     * The contract address created, if the transaction was a contract creation, otherwise null.
     */
    contractAddress?: string;
}
