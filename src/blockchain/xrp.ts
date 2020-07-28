import axios from 'axios';
import {TATUM_API_URL} from '../constants';
import {TransactionHash} from '../model';

export const xrpGetFee = async (): Promise<{ drops: { base_fee: number } }> => {
    return (await axios.get('${process.env.TATUM_API_URL || TATUM_API_URL}/v3/xrp/fee', {headers: {'x-api-key': process.env.TATUM_API_KEY}})).data;
};

export const xrpGetAccountInfo = async (account: string): Promise<{ ledger_current_index: number, account_data: { Sequence: number } }> => {
    return (await axios.get(`${process.env.TATUM_API_URL || TATUM_API_URL}/v3/xrp/account/${account}`, {headers: {'x-api-key': process.env.TATUM_API_KEY}})).data;
};

export const xrpBroadcast = async (txData: string, signatureId?: string): Promise<TransactionHash> => {
    return (await axios.post(`${process.env.TATUM_API_URL || TATUM_API_URL}/v3/xrp/broadcast`,
        {txData, signatureId},
        {headers: {'x-api-key': process.env.TATUM_API_KEY}})).data;
};


export const xrpGetCurrentBlock = async (): Promise<number> => {
    return (await axios.get(`${process.env.TATUM_API_URL || TATUM_API_URL}/v3/xrp/info`, {headers: {'x-api-key': process.env.TATUM_API_KEY}})).data;
};

export const xrpGetLedger = async (i: number) => {
    return (await axios.get(`${process.env.TATUM_API_URL || TATUM_API_URL}/v3/xrp/ledger/${i}`, {headers: {'x-api-key': process.env.TATUM_API_KEY}})).data;
};

export const xrpGetAccountBalance = async (address: string) => {
    return (await axios.get(`${process.env.TATUM_API_URL || TATUM_API_URL}/v3/xrp/account/${address}/balance`, {headers: {'x-api-key': process.env.TATUM_API_KEY}})).data;
};

export const xrpGetAccount = async (address: string) => {
    return (await axios.get(`${process.env.TATUM_API_URL || TATUM_API_URL}/v3/xrp/account/${address}`, {headers: {'x-api-key': process.env.TATUM_API_KEY}})).data;
};

export const xrpGetTransaction = async (hash: string) => {
    return (await axios.get(`${process.env.TATUM_API_URL || TATUM_API_URL}/v3/xrp/transaction/${hash}`, {headers: {'x-api-key': process.env.TATUM_API_KEY}})).data;
};

export const xrpGetAccountTransactions = async (address: string) => {
    return (await axios.get(`${process.env.TATUM_API_URL || TATUM_API_URL}/v3/xrp/account/tx/${address}`, {headers: {'x-api-key': process.env.TATUM_API_KEY}})).data;
};