/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { XrpTx } from './XrpTx';

export type XrpLedger = {
    /**
     * The complete header data of this ledger.
     */
    ledger?: {
        accepted?: boolean;
        /**
         * Hash of all account state information in this ledger, as hex.
         */
        account_hash?: string;
        /**
         * A bit-map of flags relating to the closing of this ledger. Currently, the ledger has only one flag defined for close_flags: sLCF_NoConsensusTime (value 1). If this flag is enabled, it means that validators were in conflict regarding the correct close time for the ledger, but build otherwise the same ledger, so they declared consensus while "agreeing to disagree" on the close time. In this case, the consensus ledger contains a close_time that is 1 second after that of the previous ledger. (In this case, there is no official close time, but the actual real-world close time is probably 3-6 seconds later than the specified close_time.)
         */
        close_flags?: number;
        /**
         * The time this ledger was closed, in seconds since the Ripple Epoch
         */
        close_time?: number;
        /**
         * The time this ledger was closed, in human-readable format. Always uses the UTC time zone.
         */
        close_time_human?: string;
        /**
         * Ledger close times are rounded to within this many seconds.
         */
        close_time_resolution?: number;
        /**
         * Whether or not this ledger has been closed.
         */
        closed?: boolean;
        hash?: string;
        /**
         * Unique identifying hash of the entire ledger.
         */
        ledger_hash?: string;
        /**
         * The Ledger Index of this ledger, as a quoted integer.
         */
        ledger_index?: string;
        /**
         * The time at which the previous ledger was closed.
         */
        parent_close_time?: number;
        /**
         * Unique identifying hash of the ledger that came immediately before this one.
         */
        parent_hash?: string;
        seqNum?: string;
        totalCoins?: string;
        /**
         * Total number of XRP drops in the network, as a quoted integer. (This decreases as transaction costs destroy XRP.)
         */
        total_coins?: string;
        /**
         * Hash of the transaction information included in this ledger, as hex.
         */
        transaction_hash?: string;
        transactions?: Array<XrpTx>;
    };
    /**
     * Unique identifying hash of the entire ledger.
     */
    ledger_hash?: string;
    /**
     * The Ledger Index of this ledger.
     */
    ledger_index?: number;
    /**
     * True if this data is from a validated ledger version; if omitted or set to false, this data is not final.
     */
    validated?: boolean;
}
