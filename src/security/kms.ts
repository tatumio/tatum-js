import axios from 'axios';
import {TATUM_API_URL} from '../constants';
import {Currency} from '../model';
import {TransactionKMS} from '../model/response';

/**
 * For more details, see <a href="https://tatum.io/apidoc.html#operation/GetPendingTransactionToSign" target="_blank">Tatum API documentation</a>
 */
export const getTransactionKMS = async (id: string): Promise<TransactionKMS> => {
    return (await axios.get(`${process.env.TATUM_API_URL || TATUM_API_URL}/v3/kms/${id}`, {headers: {'x-api-key': process.env.TATUM_API_KEY}})).data;
};

/**
 * For more details, see <a href="https://tatum.io/apidoc.html#operation/DeletePendingTransactionToSign" target="_blank">Tatum API documentation</a>
 */
export const deleteTransactionKMS = async (id: string, revert = true): Promise<void> => {
    await axios.delete(`${process.env.TATUM_API_URL || TATUM_API_URL}/v3/kms/${id}/${revert}`, {headers: {'x-api-key': process.env.TATUM_API_KEY}});
};

/**
 * For more details, see <a href="https://tatum.io/apidoc.html#operation/CompletePendingSignature" target="_blank">Tatum API documentation</a>
 */
export const completePendingTransactionKMS = async (id: string, txId: string): Promise<void> => {
    await axios.put(`${process.env.TATUM_API_URL || TATUM_API_URL}/v3/kms/${id}/${txId}`, undefined, {headers: {'x-api-key': process.env.TATUM_API_KEY}});
};

/**
 * For more details, see <a href="https://tatum.io/apidoc.html#operation/GetPendingTransactionsToSign" target="_blank">Tatum API documentation</a>
 */
export const getPendingTransactionsKMSByChain = async (chain: Currency): Promise<TransactionKMS[]> => {
    return (await axios.get(`${process.env.TATUM_API_URL || TATUM_API_URL}/v3/kms/pending/${chain}`, {headers: {'x-api-key': process.env.TATUM_API_KEY}})).data;
};