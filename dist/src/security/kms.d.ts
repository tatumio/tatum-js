import { Currency } from '../model';
import { TransactionKMS } from '../model/response';
/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/GetPendingTransactionToSign" target="_blank">Tatum API documentation</a>
 */
export declare const getTransactionKMS: (id: string) => Promise<TransactionKMS>;
/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/DeletePendingTransactionToSign" target="_blank">Tatum API documentation</a>
 */
export declare const deleteTransactionKMS: (id: string, revert?: boolean) => Promise<void>;
/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/CompletePendingSignature" target="_blank">Tatum API documentation</a>
 */
export declare const completePendingTransactionKMS: (id: string, txId: string) => Promise<void>;
/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/GetPendingTransactionsToSign" target="_blank">Tatum API documentation</a>
 */
export declare const getPendingTransactionsKMSByChain: (chain: Currency) => Promise<TransactionKMS[]>;
