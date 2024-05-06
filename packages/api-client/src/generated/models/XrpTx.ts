/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type XrpTx = {
    /**
     * The SHA-512 hash of the transaction
     */
    hash?: string;
    /**
     * The ledger index of the ledger that includes this transaction.
     */
    ledger_index?: number;
    /**
     * The unique address of the account that initiated the transaction.
     */
    Account?: string;
    /**
     * Amount of transaction, in drops. 1 drop = 0.000001 XRP.
     */
    Amount?: string;
    /**
     * Recipient account address.
     */
    Destination?: string;
    /**
     * The DestinationTag is used to distinguish transactions sent to accounts that serve multiple users.
     */
    DestinationTag?: number;
    /**
     * Integer amount of XRP, in drops, to be destroyed as a cost for distributing this transaction to the network. Some transaction types have different minimum requirements.
     */
    Fee?: string;
    /**
     * Type of the transaction. XRp supports more than 18 transaction types. For the payment, Payment type is used.
     */
    TransactionType?: string;
    /**
     * Set of bit-flags for this transaction.
     */
    Flags?: number;
    /**
     * Last ledger, in which this transaction could have occured.
     */
    LastLedgerSequence?: number;
    /**
     * The sequence number of the account sending the transaction. A transaction is only valid if the Sequence number is exactly 1 greater than the previous transaction from the same account.
     */
    Sequence?: number;
    /**
     * Timestamp of the transaction, in Ripple epoch (946684800 seconds after Unix Epoch)
     */
    date?: number;
    /**
     * Ledger, in which transaction took place.
     */
    inLedger?: number;
    SigningPubKey?: string;
    TxnSignature?: string;
    meta?: {
        AffectedNodes?: Array<{
            ModifiedNode?: {
                FinalFields?: {
                    Account?: string;
                    Balance?: string;
                    Flags?: number;
                    OwnerCount?: number;
                    Sequence?: number;
                };
                LedgerEntryType?: string;
                LedgerIndex?: string;
                PreviousFields?: {
                    Balance: string;
                    Sequence: number;
                };
                PreviousTxnID?: string;
                PreviousTxnLgrSeq?: number;
            };
        }>;
        TransactionIndex?: number;
        TransactionResult?: string;
        delivered_amount?: string;
    };
    /**
     * Whether or not the transaction is included in a validated ledger. Any transaction not yet in a validated ledger is subject to change.
     */
    validated?: boolean;
}
