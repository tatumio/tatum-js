/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type EgldTx = {
    /**
     * Type of transaction.
     */
    type?: string;
    /**
     * Nonce of the transaction.
     */
    nonce?: number;
    /**
     * The round number.
     */
    round?: number;
    /**
     * An epoch is a sequence of consecutive rounds during which the configuration of the network does not change (currently aprox. 24 hrs in length).
     */
    epoch?: number;
    /**
     * Transferred value.
     */
    value?: string;
    /**
     * Address of the receiver.
     */
    receiver?: string;
    /**
     * Address of the sender.
     */
    sender?: string;
    /**
     * Gas price provided by the sender
     */
    gasPrice?: number;
    /**
     * Gas provided by the sender
     */
    gasLimit?: number;
    /**
     * Data field in transaction.
     */
    data?: string;
    /**
     * Signature of the transaction.
     */
    signature?: string;
    /**
     * Source shard.
     */
    sourceShard?: number;
    /**
     * Destination shard.
     */
    destinationShard?: number;
    /**
     * Nonce of block which contains current transaction.
     */
    blockNonce?: number;
    /**
     * Hash of block which contains current transaction.
     */
    blockHash?: string;
    /**
     * Miniblock hash.
     */
    miniblockHash?: string;
    /**
     * The unix timestamp for when the block was collated.
     */
    timestamp?: number;
    /**
     * Status of the transaction.
     */
    status?: string;
    /**
     * Nonce of the hyperblockwhere this transaction was in.
     */
    hyperblockNonce?: number;
    /**
     * Hash of the hyperblock where this transaction was in.
     */
    hyperblockHash?: string;
}
