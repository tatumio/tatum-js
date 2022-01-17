/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type XlmLedger = {
    /**
     * A unique identifier for this ledger.
     */
    id?: string;
    /**
     * A cursor value for use in pagination.
     */
    paging_token?: string;
    /**
     * A hex-encoded SHA-256 hash of this ledger’s XDR-encoded form.
     */
    hash?: string;
    /**
     * The sequence number of this ledger, and the parameter used in Horizon calls that require a ledger number.
     */
    sequence?: number;
    /**
     * The number of successful transactions in this ledger.
     */
    successful_transaction_count?: number;
    /**
     * The number of failed transactions in this ledger.
     */
    failed_transaction_count?: number;
    /**
     * The number of operations applied in this ledger.
     */
    operation_count?: number;
    /**
     * An ISO 8601 formatted string of when this ledger was closed.
     */
    closed_at?: string;
    /**
     * The total number of lumens in circulation.
     */
    total_coins?: string;
    /**
     * The sum of all transaction fees.
     */
    fee_pool?: string;
    /**
     * The fee the network charges per operation in a transaction.
     */
    base_fee_in_stroops?: number;
    /**
     * The reserve the network uses when calculating an account’s minimum balance.
     */
    base_reserve_in_stroops?: number;
    /**
     * The maximum number of transactions validators have agreed to process in a given ledger.
     */
    max_tx_set_size?: number;
    /**
     * The protocol version that the Stellar network was running when this ledger was committed.
     */
    protocol_version?: number;
    /**
     * A base64 encoded string of the raw LedgerHeader xdr struct for this ledger.
     */
    header_xdr?: string;
}
