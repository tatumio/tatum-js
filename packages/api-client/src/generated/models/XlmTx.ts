/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type XlmTx = {
    /**
     * A unique identifier for this transaction.
     */
    id?: string;
    /**
     * A cursor value for use in pagination.
     */
    paging_token?: string;
    /**
     * Indicates if this transaction was successful or not.
     */
    successful?: boolean;
    /**
     * A hex-encoded SHA-256 hash of this transaction’s XDR-encoded form.
     */
    hash?: string;
    /**
     * The sequence number of the ledger that this transaction was included in.
     */
    ledger?: number;
    /**
     * The date this transaction was created.
     */
    created_at?: string;
    /**
     * The account that originates the transaction.
     */
    source_account?: string;
    /**
     * The source account’s sequence number that this transaction consumed.
     */
    source_account_sequence?: string;
    /**
     * The fee (in stroops) paid by the source account to apply this transaction to the ledger.
     */
    fee_paid?: number;
    fee_charged?: number;
    /**
     * The maximum fee (in stroops) that the source account was willing to pay.
     */
    max_fee?: number;
    /**
     * The number of operations contained within this transaction.
     */
    operation_count?: number;
    /**
     * A base64 encoded string of the raw TransactionEnvelope XDR struct for this transaction.
     */
    envelope_xdr?: string;
    /**
     * A base64 encoded string of the raw TransactionResult XDR struct for this transaction.
     */
    result_xdr?: string;
    /**
     * A base64 encoded string of the raw TransactionMeta XDR struct for this transaction
     */
    result_meta_xdr?: string;
    /**
     * A base64 encoded string of the raw LedgerEntryChanges XDR struct produced by taking fees for this transaction.
     */
    fee_meta_xdr?: string;
    /**
     * The optional memo attached to a transaction. Usually used as an account distiguisher.
     */
    memo?: string;
    /**
     * The type of memo.
     */
    memo_type?: XlmTx.memo_type;
    /**
     * An array of signatures used to sign this transaction.
     */
    signatures?: Array<string>;
}

export namespace XlmTx {

    /**
     * The type of memo.
     */
    export enum memo_type {
        MEMO_TEXT = 'MEMO_TEXT',
        MEMO_ID = 'MEMO_ID',
        MEMO_HASH = 'MEMO_HASH',
        MEMO_RETURN = 'MEMO_RETURN',
    }


}
