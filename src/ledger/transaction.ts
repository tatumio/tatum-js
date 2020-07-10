import axios from 'axios';
import {validateOrReject} from 'class-validator';
import {CreateTransaction, Transaction, TransactionType} from '../model';

export const getTransactionsByReference = async (reference: string): Promise<Transaction[]> => {
    return (await axios.get(`https://api.tatum.io/v3/ledger/transaction/${reference}`, {headers: {'x-api-key': process.env.TATUM_API_KEY}})).data;
};

export const storeTransaction = async (transaction: CreateTransaction): Promise<{ reference: string }> => {
    await validateOrReject(transaction);
    return (await axios.post(`https://api.tatum.io/v3/ledger/transaction`, transaction, {headers: {'x-api-key': process.env.TATUM_API_KEY}})).data;
};

export const getTransactionsByAccount = async (filter: TransactionType): Promise<Transaction[]> => {
    await validateOrReject(filter);
    return (await axios.post(`https://api.tatum.io/v3/ledger/transaction/account`, filter, {headers: {'x-api-key': process.env.TATUM_API_KEY}})).data;
};

export const getTransactionsByCustomer = async (filter: TransactionType): Promise<Transaction[]> => {
    await validateOrReject(filter);
    return (await axios.post(`https://api.tatum.io/v3/ledger/transaction/account`, filter, {headers: {'x-api-key': process.env.TATUM_API_KEY}})).data;
};

export const getTransactionsByLedger = async (filter: TransactionType): Promise<Transaction[]> => {
    await validateOrReject(filter);
    return (await axios.post(`https://api.tatum.io/v3/ledger/transaction/account`, filter, {headers: {'x-api-key': process.env.TATUM_API_KEY}})).data;
};