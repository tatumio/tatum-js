import { CreateTransaction, Transaction, TransactionFilter } from '../model';
/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/getTransactionsByReference" target="_blank">Tatum API documentation</a>
 */
export declare const getTransactionsByReference: (reference: string) => Promise<Transaction[]>;
/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/sendTransaction" target="_blank">Tatum API documentation</a>
 */
export declare const storeTransaction: (transaction: CreateTransaction) => Promise<{
    reference: string;
}>;
/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/getTransactionsByAccountId" target="_blank">Tatum API documentation</a>
 */
export declare const getTransactionsByAccount: (filter: TransactionFilter, pageSize?: number, offset?: number) => Promise<Transaction[]>;
/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/getTransactionsByCustomerId" target="_blank">Tatum API documentation</a>
 */
export declare const getTransactionsByCustomer: (filter: TransactionFilter, pageSize?: number, offset?: number) => Promise<Transaction[]>;
/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/getTransactions" target="_blank">Tatum API documentation</a>
 */
export declare const getTransactionsByLedger: (filter: TransactionFilter, pageSize?: number, offset?: number) => Promise<Transaction[]>;
/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/getTransactionsByAccountId" target="_blank">Tatum API documentation</a>
 */
export declare const countTransactionsByAccount: (filter: TransactionFilter) => Promise<number>;
/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/getTransactionsByCustomerId" target="_blank">Tatum API documentation</a>
 */
export declare const countTransactionsByCustomer: (filter: TransactionFilter) => Promise<number>;
/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/getTransactions" target="_blank">Tatum API documentation</a>
 */
export declare const countTransactionsByLedger: (filter: TransactionFilter) => Promise<number>;
