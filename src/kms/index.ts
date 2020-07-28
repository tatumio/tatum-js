import axios from 'axios';
import {TATUM_API_URL} from '../constants';
import {Currency} from '../model';
import {TransactionKMS} from '../model/response';

export const getTransactionKMS = async (id: string): Promise<TransactionKMS> => {
    return (await axios.get(`${process.env.TATUM_API_URL || TATUM_API_URL}/v3/kms/${id}`, {headers: {'x-api-key': process.env.TATUM_API_KEY}})).data;
};

export const deleteTransactionKMS = async (id: string, revert = true): Promise<void> => {
    await axios.delete(`${process.env.TATUM_API_URL || TATUM_API_URL}/v3/kms/${id}/${revert}`, {headers: {'x-api-key': process.env.TATUM_API_KEY}});
};

export const completePendingTransactionKMS = async (id: string, txId: string): Promise<void> => {
    await axios.put(`${process.env.TATUM_API_URL || TATUM_API_URL}/v3/kms/${id}/${txId}`, undefined, {headers: {'x-api-key': process.env.TATUM_API_KEY}});
};

export const getPendingTransactionsKMSByChain = async (chain: Currency): Promise<TransactionKMS[]> => {
    return (await axios.get(`${process.env.TATUM_API_URL || TATUM_API_URL}/v3/kms/pending/${chain}`, {headers: {'x-api-key': process.env.TATUM_API_KEY}})).data;
};