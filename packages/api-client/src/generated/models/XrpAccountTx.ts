/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { XrpTx } from './XrpTx';

export type XrpAccountTx = {
    /**
     * Unique Address identifying the related account.
     */
    account?: string;
    /**
     * The ledger index of the earliest ledger actually searched for transactions.
     */
    ledger_index_max?: number;
    /**
     * The ledger index of the most recent ledger actually searched for transactions.
     */
    ledger_index_min?: number;
    /**
     * Server-defined value indicating the response is paginated. Pass this to the next call to resume where this call left off.
     */
    marker?: {
        ledger?: number;
        seq?: number;
    };
    /**
     * Array of transactions matching the request's criteria, as explained below.
     */
    transactions?: Array<{
        /**
         * Transaction metadata included in JSON format.
         */
        meta?: {
            AffectedNodes?: Array<{
                CreatedNode?: {
                    LedgerEntryType?: string;
                    LedgerIndex?: string;
                    NewFields?: {
                        Account?: string;
                        Balance?: string;
                        Sequence?: number;
                    };
                };
            }>;
            TransactionIndex?: number;
            TransactionResult?: string;
            delivered_amount?: string;
        };
        tx?: XrpTx;
        /**
         * True if this data is from a validated ledger version; if omitted or set to false, this data is not final.
         */
        validated?: boolean;
    }>;
}
