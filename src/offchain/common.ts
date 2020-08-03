import axios from 'axios';
import {TATUM_API_URL} from '../constants';
import {Address, BroadcastWithdrawal, TxHash, WithdrawalResponse} from '../model';

export const generateDepositAddress = async (id: string): Promise<Address> => {
    return (await axios.post(`${process.env.TATUM_API_URL || TATUM_API_URL}/v3/offchain/account/${id}/address`,
        undefined,
        {headers: {'x-api-key': process.env.TATUM_API_KEY}})).data;
};

export const getDepositAddressesForAccount = async (id: string): Promise<Address[]> => {
    return (await axios.get(`${process.env.TATUM_API_URL || TATUM_API_URL}/v3/offchain/account/${id}/address`,
        {headers: {'x-api-key': process.env.TATUM_API_KEY}})).data;
};

export const offchainBroadcast = async (data: BroadcastWithdrawal): Promise<TxHash> => {
    return (await axios.post(`${process.env.TATUM_API_URL || TATUM_API_URL}/v3/offchain/withdrawal/broadcast`,
        data,
        {headers: {'x-api-key': process.env.TATUM_API_KEY}})).data;
};

export const offchainStoreWithdrawal = async (data: any): Promise<WithdrawalResponse> => {
    return (await axios.post(`${process.env.TATUM_API_URL || TATUM_API_URL}/v3/offchain/withdrawal/broadcast`,
        data,
        {headers: {'x-api-key': process.env.TATUM_API_KEY}})).data;
};

export const offchainCancelWithdrawal = async (id: string): Promise<WithdrawalResponse> => {
    return (await axios.delete(`${process.env.TATUM_API_URL || TATUM_API_URL}/v3/offchain/withdrawal/${id}`,
        {headers: {'x-api-key': process.env.TATUM_API_KEY}})).data;
};