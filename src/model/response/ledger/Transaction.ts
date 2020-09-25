/**
 *
 * @export
 * @interface Transaction
 */
import {MarketValue} from './MarketValue';
import {OperationType} from './OperationType';
import {TransactionType} from './TransactionType';

export interface Transaction {
    /**
     * Source account - source of transaction(s)
     * @type {string}
     * @memberof Transaction
     */
    accountId: string;
    /**
     * Amount in account's currency
     * @type {string}
     * @memberof Transaction
     */
    amount: string;
    /**
     * Whether the transaction is anonymous. If true, counter account owner does not see source account.
     * @type {boolean}
     * @memberof Transaction
     */
    anonymous: boolean;
    /**
     * Counter account - transaction(s) destination account. In case of blockchain recipient, this is addess of blockchain account.
     * @type {string}
     * @memberof Transaction
     */
    counterAccountId?: string;
    /**
     * Transaction currency
     * @type {string}
     * @memberof Transaction
     */
    currency: string;
    /**
     * Time in UTC of transaction.
     * @type {number}
     * @memberof Transaction
     */
    created: number;
    /**
     * List of market values of given transaction with all supported base pairs.
     * @type {Array<MarketValue>}
     * @memberof Transaction
     */
    marketValue: MarketValue[];
    /**
     * Type of operation.
     * @type {string}
     * @memberof Transaction
     */
    operationType: OperationType;
    /**
     * Payment ID defined in payment order by sender.
     * @type {string}
     * @memberof Transaction
     */
    paymentId?: string;
    /**
     * Present only for operationType WITHDRAWAL and XLM / XRP based accounts it represents message or destinationTag of the recipient, if present.
     * @type {string}
     * @memberof Transaction
     */
    attr?: string;
    /**
     * For operationType DEPOSIT it represents address, on which was deposit credited for the account.
     * @type {string}
     * @memberof Transaction
     */
    address?: string;
    /**
     * Note visible for both sender and recipient.
     * @type {string}
     * @memberof Transaction
     */
    recipientNote?: string;
    /**
     * Transaction internal reference - unique identifier within Tatum ledger. In order of failure, use this value to search for problems.
     * @type {string}
     * @memberof Transaction
     */
    reference: string;
    /**
     * For operationType DEPOSIT, BLOCKCHAIN_TRANSACTION it represents transaction id, for which deposit occured.
     * @type {string}
     * @memberof Transaction
     */
    txId?: string;
    /**
     * Note visible for sender.
     * @type {string}
     * @memberof Transaction
     */
    senderNote?: string;
    /**
     * For bookkeeping to distinct transaction purpose.
     * @type {string}
     * @memberof Transaction
     */
    transactionCode?: string;
    /**
     * Type of payment.
     * @type {string}
     * @memberof Transaction
     */
    transactionType: TransactionType;
}
