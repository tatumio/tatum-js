/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type XrpAccount = {
    /**
     * The AccountRoot ledger object with this account's information, as stored in the ledger.
     */
    account_data?: {
        /**
         * The identifying address of this account, such as rf1BiGeXwwQoi8Z2ueFYTEXSwuJYfV2Jpn.
         */
        Account?: string;
        /**
         * The account's current XRP balance in drops, represented as a string.
         */
        Balance?: string;
        /**
         * A bit-map of boolean flags enabled for this account.
         */
        Flags?: number;
        /**
         * The value 0x0061, mapped to the string AccountRoot, indicates that this is an AccountRoot object.
         */
        LedgerEntryType?: string;
        /**
         * The number of objects this account owns in the ledger, which contributes to its owner reserve.
         */
        OwnerCount?: number;
        /**
         * The identifying hash of the transaction that most recently modified this object.
         */
        PreviousTxnID?: string;
        /**
         * The index of the ledger that contains the transaction that most recently modified this object.
         */
        PreviousTxnLgrSeq?: number;
        /**
         * The sequence number of the next valid transaction for this account. (Each account starts with Sequence = 1 and increases each time a transaction is made.)
         */
        Sequence?: number;
        index?: string;
    };
    /**
     * The Ledger Index of the current open ledger these stats describe.
     */
    ledger_current_index?: number;
    /**
     * True if this data is from a validated ledger version; if omitted or set to false, this data is not final.
     */
    validated?: boolean;
}
