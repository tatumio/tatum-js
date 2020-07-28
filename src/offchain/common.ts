import axios from 'axios';
import {TATUM_API_URL} from '../constants';
import {BroadcastWithdrawal, TxHash, WithdrawalResponse} from '../model';

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