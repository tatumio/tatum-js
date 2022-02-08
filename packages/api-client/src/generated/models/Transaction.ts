/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { MarketValue } from './MarketValue';

export type Transaction = {
    /**
     * Source account - source of transaction(s)
     */
    accountId: string;
    /**
     * Counter account - transaction(s) destination account. In case of blockchain recipient, this is addess of blockchain account.
     */
    counterAccountId?: string;
    /**
     * Transaction currency
     */
    currency: string;
    /**
     * Amount in account's currency
     */
    amount: string;
    /**
     * Whether the transaction is anonymous. If true, counter account owner does not see source account.
     */
    anonymous: boolean;
    /**
     * Time in UTC of transaction.
     */
    created: number;
    marketValue: MarketValue;
    /**
     * Type of operation.
     */
    operationType: 'PAYMENT' | 'WITHDRAWAL' | 'BLOCKCHAIN_TRANSACTION' | 'EXCHANGE' | 'FAILED' | 'DEPOSIT' | 'MINT' | 'REVOKE';
    /**
     * Type of payment.
     */
    transactionType: 'FAILED' | 'DEBIT_PAYMENT' | 'CREDIT_PAYMENT' | 'CREDIT_DEPOSIT' | 'DEBIT_WITHDRAWAL' | 'CANCEL_WITHDRAWAL' | 'DEBIT_OUTGOING_PAYMENT' | 'CREDIT_INCOMING_PAYMENT' | 'EXCHANGE_BUY' | 'EXCHANGE_SELL';
    /**
     * Transaction internal reference - unique identifier within Tatum ledger. In order of failure, use this value to search for problems.
     */
    reference: string;
    /**
     * For bookkeeping to distinct transaction purpose.
     */
    transactionCode?: string;
    /**
     * Note visible for sender.
     */
    senderNote?: string;
    /**
     * Note visible for both sender and recipient.
     */
    recipientNote?: string;
    /**
     * Payment ID defined in payment order by sender.
     */
    paymentId?: string;
    /**
     * Present only for operationType WITHDRAWAL and XLM / XRP based accounts it represents message or destinationTag of the recipient, if present.
     */
    attr?: string;
    /**
     * For operationType DEPOSIT it represents address, on which was deposit credited for the account.
     */
    address?: string;
    /**
     * For operationType DEPOSIT, BLOCKCHAIN_TRANSACTION it represents transaction id, for which deposit occured.
     */
    txId?: string;
}
