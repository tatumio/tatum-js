import {get, httpDelete, put} from '../connector/tatum';
import {Currency, TransactionKMS} from '../model';

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/GetPendingTransactionToSign" target="_blank">Tatum API documentation</a>
 */
export const getTransactionKMS = async (id: string): Promise<TransactionKMS> => get(`/v3/kms/${id}`);

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/DeletePendingTransactionToSign" target="_blank">Tatum API documentation</a>
 */
export const deleteTransactionKMS = async (id: string, revert = true): Promise<void> => httpDelete(`/v3/kms/${id}?revert=${revert}`);

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/CompletePendingSignature" target="_blank">Tatum API documentation</a>
 */
export const completePendingTransactionKMS = async (id: string, txId: string): Promise<void> => put(`/v3/kms/${id}/${txId}`);

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/GetPendingTransactionsToSign" target="_blank">Tatum API documentation</a>
 */
export const getPendingTransactionsKMSByChain = async (chain: Currency, signatures?: string): Promise<TransactionKMS[]> => {
    let url = `/v3/kms/pending/${chain}`;
    if (signatures) {
        url += `?signatures=${signatures}`;
    }
    return get(url);
};
