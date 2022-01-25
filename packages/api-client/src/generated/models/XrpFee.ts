/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type XrpFee = {
    /**
     * Number of transactions provisionally included in the in-progress ledger.
     */
    current_ledger_size?: string;
    /**
     * Number of transactions currently queued for the next ledger.
     */
    current_queue_size?: string;
    /**
     * Various information about the transaction cost (the Fee field of a transaction), in drops of XRP.
     */
    drops?: {
        /**
         * The transaction cost required for a reference transaction to be included in a ledger under minimum load, represented in drops of XRP.
         */
        base_fee?: string;
        /**
         * An approximation of the median transaction cost among transactions included in the previous validated ledger, represented in drops of XRP.
         */
        median_fee?: string;
        /**
         * The minimum transaction cost for a reference transaction to be queued for a later ledger, represented in drops of XRP. If greater than base_fee, the transaction queue is full.
         */
        minimum_fee?: string;
        /**
         * The minimum transaction cost that a reference transaction must pay to be included in the current open ledger, represented in drops of XRP.
         */
        open_ledger_fee?: string;
    };
    /**
     * The approximate number of transactions expected to be included in the current ledger. This is based on the number of transactions in the previous ledger.
     */
    expected_ledger_size?: string;
    /**
     * The Ledger Index of the current open ledger these stats describe.
     */
    ledger_current_index?: number;
    /**
     * Various information about the transaction cost, in fee levels. The ratio in fee levels applies to any transaction relative to the minimum cost of that particular transaction.
     */
    levels?: {
        /**
         * The median transaction cost among transactions in the previous validated ledger, represented in fee levels.
         */
        median_level?: string;
        /**
         * The minimum transaction cost required to be queued for a future ledger, represented in fee levels.
         */
        minimum_level?: string;
        /**
         * The minimum transaction cost required to be included in the current open ledger, represented in fee levels.
         */
        open_ledger_level?: string;
        /**
         * The equivalent of the minimum transaction cost, represented in fee levels.
         */
        reference_level?: string;
    };
    /**
     * The maximum number of transactions that the transaction queue can currently hold.
     */
    max_queue_size?: string;
}
