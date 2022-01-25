/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type TransactionFilter = {
    /**
     * Account ID - source of transaction(s).
     */
    id: string;
    /**
     * Counter account - transaction(s) destination account.
     */
    counterAccount?: string;
    /**
     * Starting date to search for transactions from in UTC millis. If not present, search all history.
     */
    from?: number;
    /**
     * Date until to search for transactions in UTC millis. If not present, search up till now.
     */
    to?: number;
    /**
     * Currency of the transactions.
     */
    currency?: string;
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
    transactionType?: TransactionFilter.transactionType;
    /**
     * Types of payment
     */
    transactionTypes?: Array<'FAILED' | 'DEBIT_PAYMENT' | 'CREDIT_PAYMENT' | 'CREDIT_DEPOSIT' | 'DEBIT_WITHDRAWAL' | 'CANCEL_WITHDRAWAL' | 'DEBIT_OUTGOING_PAYMENT' | 'EXCHANGE_BUY' | 'EXCHANGE_SELL' | 'DEBIT_TRANSACTION' | 'CREDIT_INCOMING_PAYMENT'>;
    /**
     * Type of operation
     */
    opType?: TransactionFilter.opType;
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
}

export namespace TransactionFilter {

    /**
     * Type of payment
     */
    export enum transactionType {
        FAILED = 'FAILED',
        DEBIT_PAYMENT = 'DEBIT_PAYMENT',
        CREDIT_PAYMENT = 'CREDIT_PAYMENT',
        CREDIT_DEPOSIT = 'CREDIT_DEPOSIT',
        DEBIT_WITHDRAWAL = 'DEBIT_WITHDRAWAL',
        CANCEL_WITHDRAWAL = 'CANCEL_WITHDRAWAL',
        DEBIT_OUTGOING_PAYMENT = 'DEBIT_OUTGOING_PAYMENT',
        EXCHANGE_BUY = 'EXCHANGE_BUY',
        EXCHANGE_SELL = 'EXCHANGE_SELL',
        DEBIT_TRANSACTION = 'DEBIT_TRANSACTION',
        CREDIT_INCOMING_PAYMENT = 'CREDIT_INCOMING_PAYMENT',
    }

    /**
     * Type of operation
     */
    export enum opType {
        PAYMENT = 'PAYMENT',
        WITHDRAWAL = 'WITHDRAWAL',
        BLOCKCHAIN_TRANSACTION = 'BLOCKCHAIN_TRANSACTION',
        EXCHANGE = 'EXCHANGE',
        FAILED = 'FAILED',
        DEPOSIT = 'DEPOSIT',
        MINT = 'MINT',
        REVOKE = 'REVOKE',
    }


}
