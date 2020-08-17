import axios from 'axios';
import {TATUM_API_URL} from '../constants';
import {Address, BroadcastWithdrawal, TxHash, WithdrawalResponse} from '../model';

/**
 * For more details, see <a href="https://tatum.io/apidoc.html#operation/generateDepositAddress" target="_blank">Tatum API documentation</a>
 */
export const generateDepositAddress = async (id: string): Promise<Address> => {
    return (await axios.post(`${process.env.TATUM_API_URL || TATUM_API_URL}/v3/offchain/account/${id}/address`,
        undefined,
        {headers: {'x-api-key': process.env.TATUM_API_KEY}})).data;
};

/**
 * For more details, see <a href="https://tatum.io/apidoc.html#operation/getAllDepositAddresses" target="_blank">Tatum API documentation</a>
 */
export const getDepositAddressesForAccount = async (id: string): Promise<Address[]> => {
    return (await axios.get(`${process.env.TATUM_API_URL || TATUM_API_URL}/v3/offchain/account/${id}/address`,
        {headers: {'x-api-key': process.env.TATUM_API_KEY}})).data;
};

/**
 * For more details, see <a href="https://tatum.io/apidoc.html#operation/broadcastBlockchainTransaction" target="_blank">Tatum API documentation</a>
 */
export const offchainBroadcast = async (data: BroadcastWithdrawal): Promise<TxHash> => {
    return (await axios.post(`${process.env.TATUM_API_URL || TATUM_API_URL}/v3/offchain/withdrawal/broadcast`,
        data,
        {headers: {'x-api-key': process.env.TATUM_API_KEY}})).data;
};

/**
 * For more details, see <a href="https://tatum.io/apidoc.html#operation/storeWithdrawal" target="_blank">Tatum API documentation</a>
 */
export const offchainStoreWithdrawal = async (data: any): Promise<WithdrawalResponse> => {
    return (await axios.post(`${process.env.TATUM_API_URL || TATUM_API_URL}/v3/offchain/withdrawal`,
        data,
        {headers: {'x-api-key': process.env.TATUM_API_KEY}})).data;
};

/**
 * For more details, see <a href="https://tatum.io/apidoc.html#operation/cancelInProgressWithdrawal" target="_blank">Tatum API documentation</a>
 */
export const offchainCancelWithdrawal = async (id: string): Promise<WithdrawalResponse> => {
    return (await axios.delete(`${process.env.TATUM_API_URL || TATUM_API_URL}/v3/offchain/withdrawal/${id}`,
        {headers: {'x-api-key': process.env.TATUM_API_KEY}})).data;
};