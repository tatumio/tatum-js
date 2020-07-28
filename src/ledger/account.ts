import axios from 'axios';
import {validateOrReject} from 'class-validator';
import {TATUM_API_URL} from '../constants';
import {Account, AccountBalance, Blockage, BlockAmount, CreateAccount} from '../model';

export const getAccountById = async (id: string): Promise<Account> => {
    return (await axios.get(`${process.env.TATUM_API_URL || TATUM_API_URL}/v3/ledger/account/${id}`, {headers: {'x-api-key': process.env.TATUM_API_KEY}})).data;
};

export const createAccount = async (account: CreateAccount): Promise<Account> => {
    await validateOrReject(account);
    return (await axios.post(`${process.env.TATUM_API_URL || TATUM_API_URL}/v3/ledger/account`, account, {headers: {'x-api-key': process.env.TATUM_API_KEY}})).data;
};

export const getBlockedAmountsByAccountId = async (id: string, pageSize: number = 50, offset = 0): Promise<Blockage[]> => {
    return (await axios.get(`${process.env.TATUM_API_URL || TATUM_API_URL}/v3/ledger/account/block/${id}
    ?pageSize=${pageSize}&offset=${offset}`, {headers: {'x-api-key': process.env.TATUM_API_KEY}})).data;
};

export const blockAmount = async (id: string, block: BlockAmount): Promise<{ id: string }> => {
    await validateOrReject(block);
    return (await axios.post(`${process.env.TATUM_API_URL || TATUM_API_URL}/v3/ledger/account/block/${id}`, block, {headers: {'x-api-key': process.env.TATUM_API_KEY}})).data;
};

export const deleteBlockedAmount = async (id: string): Promise<void> => {
    await axios.delete(`${process.env.TATUM_API_URL || TATUM_API_URL}/v3/ledger/account/block/${id}`, {headers: {'x-api-key': process.env.TATUM_API_KEY}});
};

export const deleteBlockedAmountForAccount = async (id: string): Promise<void> => {
    await axios.delete(`${process.env.TATUM_API_URL || TATUM_API_URL}/v3/ledger/account/block/account/${id}`, {headers: {'x-api-key': process.env.TATUM_API_KEY}});
};

export const activateAccount = async (id: string): Promise<void> => {
    await axios.put(`${process.env.TATUM_API_URL || TATUM_API_URL}/v3/ledger/account/${id}/activate`, undefined, {headers: {'x-api-key': process.env.TATUM_API_KEY}});
};

export const deactivateAccount = async (id: string): Promise<void> => {
    await axios.put(`${process.env.TATUM_API_URL || TATUM_API_URL}/v3/ledger/account/${id}/deactivate`, undefined, {headers: {'x-api-key': process.env.TATUM_API_KEY}});
};

export const freezeAccount = async (id: string): Promise<void> => {
    await axios.put(`${process.env.TATUM_API_URL || TATUM_API_URL}/v3/ledger/account/${id}/freeze`, undefined, {headers: {'x-api-key': process.env.TATUM_API_KEY}});
};

export const unfreezeAccount = async (id: string): Promise<void> => {
    await axios.put(`${process.env.TATUM_API_URL || TATUM_API_URL}/v3/ledger/account/${id}/unfreeze`, undefined, {headers: {'x-api-key': process.env.TATUM_API_KEY}});
};

export const getAccountsByCustomerId = async (id: string, pageSize: number = 50, offset = 0): Promise<Account[]> => {
    return (await axios.get(`${process.env.TATUM_API_URL || TATUM_API_URL}/v3/ledger/account/customer/${id}?pageSize=${pageSize}&offset=${offset}`,
        {headers: {'x-api-key': process.env.TATUM_API_KEY}})).data;
};

export const getAllAccounts = async (pageSize: number = 50, offset = 0): Promise<Account[]> => {
    return (await axios.get(`${process.env.TATUM_API_URL || TATUM_API_URL}/v3/ledger/account?pageSize=${pageSize}&offset=${offset}`,
        {headers: {'x-api-key': process.env.TATUM_API_KEY}})).data;
};

export const getAccountBalance = async (id: string): Promise<AccountBalance> => {
    return (await axios.get(`${process.env.TATUM_API_URL || TATUM_API_URL}/v3/ledger/account/${id}/balance`, {headers: {'x-api-key': process.env.TATUM_API_KEY}})).data;
};