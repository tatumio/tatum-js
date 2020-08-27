import axios from 'axios';
import {validateOrReject} from 'class-validator';
import {TATUM_API_URL} from '../constants';
import {Account, AccountBalance, Blockage, BlockAmount, CreateAccount} from '../model';

/**
 * For more details, see <a href="https://tatum.io/apidoc.html#operation/getAccountByAccountId" target="_blank">Tatum API documentation</a>
 */
export const getAccountById = async (id: string): Promise<Account> => {
    return (await axios.get(`${process.env.TATUM_API_URL || TATUM_API_URL}/v3/ledger/account/${id}`, {headers: {'x-api-key': process.env.TATUM_API_KEY}})).data;
};

/**
 * For more details, see <a href="https://tatum.io/apidoc.html#operation/createAccount" target="_blank">Tatum API documentation</a>
 */
export const createAccount = async (account: CreateAccount): Promise<Account> => {
    await validateOrReject(account);
    return (await axios.post(`${process.env.TATUM_API_URL || TATUM_API_URL}/v3/ledger/account`, account, {headers: {'x-api-key': process.env.TATUM_API_KEY}})).data;
};

/**
 * For more details, see <a href="https://tatum.io/apidoc.html#operation/getBlockAmount" target="_blank">Tatum API documentation</a>
 */
export const getBlockedAmountsByAccountId = async (id: string, pageSize: number = 50, offset = 0): Promise<Blockage[]> => {
    return (await axios.get(`${process.env.TATUM_API_URL || TATUM_API_URL}/v3/ledger/account/block/${id}?pageSize=${pageSize}&offset=${offset}`, {headers: {'x-api-key': process.env.TATUM_API_KEY}})).data;
};

/**
 * For more details, see <a href="https://tatum.io/apidoc.html#operation/blockAmount" target="_blank">Tatum API documentation</a>
 */
export const blockAmount = async (id: string, block: BlockAmount): Promise<{ id: string }> => {
    await validateOrReject(block);
    return (await axios.post(`${process.env.TATUM_API_URL || TATUM_API_URL}/v3/ledger/account/block/${id}`, block, {headers: {'x-api-key': process.env.TATUM_API_KEY}})).data;
};

/**
 * For more details, see <a href="https://tatum.io/apidoc.html#operation/deleteBlockAmount" target="_blank">Tatum API documentation</a>
 */
export const deleteBlockedAmount = async (id: string): Promise<void> => {
    await axios.delete(`${process.env.TATUM_API_URL || TATUM_API_URL}/v3/ledger/account/block/${id}`, {headers: {'x-api-key': process.env.TATUM_API_KEY}});
};

/**
 * For more details, see <a href="https://tatum.io/apidoc.html#operation/deleteAllBlockAmount" target="_blank">Tatum API documentation</a>
 */
export const deleteBlockedAmountForAccount = async (id: string): Promise<void> => {
    await axios.delete(`${process.env.TATUM_API_URL || TATUM_API_URL}/v3/ledger/account/block/account/${id}`, {headers: {'x-api-key': process.env.TATUM_API_KEY}});
};

/**
 * For more details, see <a href="https://tatum.io/apidoc.html#operation/activateAccount" target="_blank">Tatum API documentation</a>
 */
export const activateAccount = async (id: string): Promise<void> => {
    await axios.put(`${process.env.TATUM_API_URL || TATUM_API_URL}/v3/ledger/account/${id}/activate`, undefined, {headers: {'x-api-key': process.env.TATUM_API_KEY}});
};

/**
 * For more details, see <a href="https://tatum.io/apidoc.html#operation/deactivateAccount" target="_blank">Tatum API documentation</a>
 */
export const deactivateAccount = async (id: string): Promise<void> => {
    await axios.put(`${process.env.TATUM_API_URL || TATUM_API_URL}/v3/ledger/account/${id}/deactivate`, undefined, {headers: {'x-api-key': process.env.TATUM_API_KEY}});
};

/**
 * For more details, see <a href="https://tatum.io/apidoc.html#operation/freezeAccount" target="_blank">Tatum API documentation</a>
 */
export const freezeAccount = async (id: string): Promise<void> => {
    await axios.put(`${process.env.TATUM_API_URL || TATUM_API_URL}/v3/ledger/account/${id}/freeze`, undefined, {headers: {'x-api-key': process.env.TATUM_API_KEY}});
};

/**
 * For more details, see <a href="https://tatum.io/apidoc.html#operation/unfreezeAccount" target="_blank">Tatum API documentation</a>
 */
export const unfreezeAccount = async (id: string): Promise<void> => {
    await axios.put(`${process.env.TATUM_API_URL || TATUM_API_URL}/v3/ledger/account/${id}/unfreeze`, undefined, {headers: {'x-api-key': process.env.TATUM_API_KEY}});
};

/**
 * For more details, see <a href="https://tatum.io/apidoc.html#operation/getAccountsByCustomerId" target="_blank">Tatum API documentation</a>
 */
export const getAccountsByCustomerId = async (id: string, pageSize: number = 50, offset = 0): Promise<Account[]> => {
    return (await axios.get(`${process.env.TATUM_API_URL || TATUM_API_URL}/v3/ledger/account/customer/${id}?pageSize=${pageSize}&offset=${offset}`,
        {headers: {'x-api-key': process.env.TATUM_API_KEY}})).data;
};

/**
 * For more details, see <a href="https://tatum.io/apidoc.html#operation/getAllAccounts" target="_blank">Tatum API documentation</a>
 */
export const getAllAccounts = async (pageSize: number = 50, offset = 0): Promise<Account[]> => {
    return (await axios.get(`${process.env.TATUM_API_URL || TATUM_API_URL}/v3/ledger/account?pageSize=${pageSize}&offset=${offset}`,
        {headers: {'x-api-key': process.env.TATUM_API_KEY}})).data;
};

/**
 * For more details, see <a href="https://tatum.io/apidoc.html#operation/getAccountBalance" target="_blank">Tatum API documentation</a>
 */
export const getAccountBalance = async (id: string): Promise<AccountBalance> => {
    return (await axios.get(`${process.env.TATUM_API_URL || TATUM_API_URL}/v3/ledger/account/${id}/balance`, {headers: {'x-api-key': process.env.TATUM_API_KEY}})).data;
};