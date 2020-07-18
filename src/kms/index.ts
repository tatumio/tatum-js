import axios from 'axios';
import {Currency} from '../model';
import {TransactionKMS} from '../model/response';

export const getPendingTransactionKMS = async (id: string): Promise<TransactionKMS> => {
    return (await axios.get(`https://api.tatum.io/v3/kms/${id}`, {headers: {'x-api-key': process.env.TATUM_API_KEY}})).data;
};

export const completePendingTransactionKMS = async (id: string, txId: string): Promise<void> => {
    await axios.put(`https://api.tatum.io/v3/ledger/kms/${id}/${txId}`, undefined, {headers: {'x-api-key': process.env.TATUM_API_KEY}});
};

export const getPendingTransactionsKMSByChain = async (chain: Currency): Promise<TransactionKMS[]> => {
    return (await axios.get(`https://api.tatum.io/v3/ledger/kms/pending/${chain}`, {headers: {'x-api-key': process.env.TATUM_API_KEY}})).data;
};