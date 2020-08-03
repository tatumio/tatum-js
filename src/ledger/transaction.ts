import axios from 'axios';
import {validateOrReject} from 'class-validator';
import {TATUM_API_URL} from '../constants';
import {CreateTransaction, Transaction, TransactionFilter, TransactionType} from '../model';

export const getTransactionsByReference = async (reference: string): Promise<Transaction[]> => {
    return (await axios.get(`${process.env.TATUM_API_URL || TATUM_API_URL}/v3/ledger/transaction/${reference}`, {headers: {'x-api-key': process.env.TATUM_API_KEY}})).data;
};

export const storeTransaction = async (transaction: CreateTransaction): Promise<{ reference: string }> => {
    await validateOrReject(transaction);
    return (await axios.post(`${process.env.TATUM_API_URL || TATUM_API_URL}/v3/ledger/transaction`, transaction, {headers: {'x-api-key': process.env.TATUM_API_KEY}})).data;
};

export const getTransactionsByAccount = async (filter: TransactionFilter, pageSize: number = 50, offset: number = 0): Promise<Transaction[]> => {
    await validateOrReject(filter);
    return (await axios.post(`${process.env.TATUM_API_URL || TATUM_API_URL}/v3/ledger/transaction/account?pageSize=${pageSize}&offset=${offset}`,
        filter, {headers: {'x-api-key': process.env.TATUM_API_KEY}})).data;
};

export const getTransactionsByCustomer = async (filter: TransactionFilter, pageSize: number = 50, offset: number = 0): Promise<Transaction[]> => {
    await validateOrReject(filter);
    return (await axios.post(`${process.env.TATUM_API_URL || TATUM_API_URL}/v3/ledger/transaction/customer?pageSize=${pageSize}&offset=${offset}`,
        filter, {headers: {'x-api-key': process.env.TATUM_API_KEY}})).data;
};

export const getTransactionsByLedger = async (filter: TransactionFilter, pageSize: number = 50, offset: number = 0): Promise<Transaction[]> => {
    await validateOrReject(filter);
    return (await axios.post(`${process.env.TATUM_API_URL || TATUM_API_URL}/v3/ledger/transaction/ledger?pageSize=${pageSize}&offset=${offset}`,
        filter, {headers: {'x-api-key': process.env.TATUM_API_KEY}})).data;
};