/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type TransactionFilterLedger = {
    /**
     * Source account - source of transaction(s).
     */
    account?: string;
    /**
     * Counter account - transaction(s) destination account.
     */
    counterAccount?: string;
    /**
     * Currency of the transactions.
     */
    currency?: string;
    /**
     * Starting date to search for transactions from in UTC millis. If not present, search all history.
     */
    from?: number;
    /**
     * Amount of the transaction. AND is used between filter options.
     */
    amount?: Array<{
        /**
         * Filtering operation.
         */
        op: 'gte' | 'lte' | 'gt' | 'lt' | 'eq' | 'neq';
        /**
         * Value of the operation.
         */
        value: string;
    }>;
    /**
     * List of currencies of the transactions.
     */
    currencies?: Array<string>;
    /**
     * Type of payment
     */
    transactionType?: 'FAILED' | 'DEBIT_PAYMENT' | 'CREDIT_PAYMENT' | 'CREDIT_DEPOSIT' | 'DEBIT_WITHDRAWAL' | 'CANCEL_WITHDRAWAL' | 'DEBIT_OUTGOING_PAYMENT' | 'EXCHANGE_BUY' | 'EXCHANGE_SELL' | 'DEBIT_TRANSACTION' | 'CREDIT_INCOMING_PAYMENT';
    /**
     * Types of payment
     */
    transactionTypes?: Array<'FAILED' | 'DEBIT_PAYMENT' | 'CREDIT_PAYMENT' | 'CREDIT_DEPOSIT' | 'DEBIT_WITHDRAWAL' | 'CANCEL_WITHDRAWAL' | 'DEBIT_OUTGOING_PAYMENT' | 'EXCHANGE_BUY' | 'EXCHANGE_SELL' | 'DEBIT_TRANSACTION' | 'CREDIT_INCOMING_PAYMENT'>;
    /**
     * Type of operation.
     */
    opType?: 'PAYMENT' | 'WITHDRAWAL' | 'BLOCKCHAIN_TRANSACTION' | 'EXCHANGE' | 'FAILED' | 'DEPOSIT' | 'MINT' | 'REVOKE';
    /**
     * For bookkeeping to distinct transaction purpose.
     */
    transactionCode?: string;
    /**
     * Payment ID defined in payment order by sender.
     */
    paymentId?: string;
    /**
     * Recipient note defined in payment order by sender.
     */
    recipientNote?: string;
    /**
     * Sender note defined in payment order by sender.
     */
    senderNote?: string;
    /**
     * Date until to search for transactions in UTC millis. If not present, search up till now.
     */
    to?: number;
}
