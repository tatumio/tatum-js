import axios from 'axios';
import {validateOrReject} from 'class-validator';
import {TATUM_API_URL} from '../constants';
import {CreateTransaction, Transaction, TransactionFilter, TransactionType} from '../model';

/**
 * For more details, see <a href="https://tatum.io/apidoc.html#operation/getTransactionsByReference" target="_blank">Tatum API documentation</a>
 */
export const getTransactionsByReference = async (reference: string): Promise<Transaction[]> => {
    return (await axios.get(`${process.env.TATUM_API_URL || TATUM_API_URL}/v3/ledger/transaction/reference/${reference}`, {headers: {'x-api-key': process.env.TATUM_API_KEY}})).data;
};

/**
 * For more details, see <a href="https://tatum.io/apidoc.html#operation/sendTransaction" target="_blank">Tatum API documentation</a>
 */
export const storeTransaction = async (transaction: CreateTransaction): Promise<{ reference: string }> => {
    await validateOrReject(transaction);
    return (await axios.post(`${process.env.TATUM_API_URL || TATUM_API_URL}/v3/ledger/transaction`, transaction, {headers: {'x-api-key': process.env.TATUM_API_KEY}})).data;
};

/**
 * For more details, see <a href="https://tatum.io/apidoc.html#operation/getTransactionsByAccountId" target="_blank">Tatum API documentation</a>
 */
export const getTransactionsByAccount = async (filter: TransactionFilter, pageSize: number = 50, offset: number = 0): Promise<Transaction[]> => {
    await validateOrReject(filter);
    return (await axios.post(`${process.env.TATUM_API_URL || TATUM_API_URL}/v3/ledger/transaction/account?pageSize=${pageSize}&offset=${offset}`,
        filter, {headers: {'x-api-key': process.env.TATUM_API_KEY}})).data;
};

/**
 * For more details, see <a href="https://tatum.io/apidoc.html#operation/getTransactionsByCustomerId" target="_blank">Tatum API documentation</a>
 */
export const getTransactionsByCustomer = async (filter: TransactionFilter, pageSize: number = 50, offset: number = 0): Promise<Transaction[]> => {
    await validateOrReject(filter);
    return (await axios.post(`${process.env.TATUM_API_URL || TATUM_API_URL}/v3/ledger/transaction/customer?pageSize=${pageSize}&offset=${offset}`,
        filter, {headers: {'x-api-key': process.env.TATUM_API_KEY}})).data;
};

/**
 * For more details, see <a href="https://tatum.io/apidoc.html#operation/getTransactions" target="_blank">Tatum API documentation</a>
 */
export const getTransactionsByLedger = async (filter: TransactionFilter, pageSize: number = 50, offset: number = 0): Promise<Transaction[]> => {
    await validateOrReject(filter);
    return (await axios.post(`${process.env.TATUM_API_URL || TATUM_API_URL}/v3/ledger/transaction/ledger?pageSize=${pageSize}&offset=${offset}`,
        filter, {headers: {'x-api-key': process.env.TATUM_API_KEY}})).data;
};

/**
 * For more details, see <a href="https://tatum.io/apidoc.html#operation/getTransactionsByAccountId" target="_blank">Tatum API documentation</a>
 */
export const countTransactionsByAccount = async (filter: TransactionFilter): Promise<number> => {
    await validateOrReject(filter);
    return (await axios.post(`${process.env.TATUM_API_URL || TATUM_API_URL}/v3/ledger/transaction/account?count=true`,
        filter, {headers: {'x-api-key': process.env.TATUM_API_KEY}})).data;
};

/**
 * For more details, see <a href="https://tatum.io/apidoc.html#operation/getTransactionsByCustomerId" target="_blank">Tatum API documentation</a>
 */
export const countTransactionsByCustomer = async (filter: TransactionFilter): Promise<number> => {
    await validateOrReject(filter);
    return (await axios.post(`${process.env.TATUM_API_URL || TATUM_API_URL}/v3/ledger/transaction/customer?count=true`,
        filter, {headers: {'x-api-key': process.env.TATUM_API_KEY}})).data;
};

/**
 * For more details, see <a href="https://tatum.io/apidoc.html#operation/getTransactions" target="_blank">Tatum API documentation</a>
 */
export const countTransactionsByLedger = async (filter: TransactionFilter): Promise<number> => {
    await validateOrReject(filter);
    return (await axios.post(`${process.env.TATUM_API_URL || TATUM_API_URL}/v3/ledger/transaction/ledger?count=true`,
        filter, {headers: {'x-api-key': process.env.TATUM_API_KEY}})).data;
};