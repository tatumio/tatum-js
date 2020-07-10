import axios from 'axios';
import {BroadcastWithdrawal, TxHash, WithdrawalResponse} from '../model';

export const offchainBroadcast = async (data: BroadcastWithdrawal): Promise<TxHash> => {
    return (await axios.post(`https://api.tatum.io/v3/offchain/withdrawal/broadcast`,
        data,
        {headers: {'x-api-key': process.env.TATUM_API_KEY}})).data;
};

export const offchainStoreWithdrawal = async (data: any): Promise<WithdrawalResponse> => {
    return (await axios.post(`https://api.tatum.io/v3/offchain/withdrawal/broadcast`,
        data,
        {headers: {'x-api-key': process.env.TATUM_API_KEY}})).data;
};

export const offchainCancelWithdrawal = async (id: string): Promise<WithdrawalResponse> => {
    return (await axios.delete(`https://api.tatum.io/v3/offchain/withdrawal/${id}`,
        {headers: {'x-api-key': process.env.TATUM_API_KEY}})).data;
};