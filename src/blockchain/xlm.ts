import axios from 'axios';
import {TransactionHash} from '../model';

export const xlmGetAccountInfo = async (account: string): Promise<{ sequence: string }> => {
    return (await axios.get(`https://api.tatum.io/v3/xlm/account/${account}`, {headers: {'x-api-key': process.env.TATUM_API_KEY}})).data;
};

export const xlmBroadcast = async (txData: string, signatureId?: string): Promise<TransactionHash> => {
    return (await axios.post(`https://api.tatum.io/v3/xlm/broadcast`,
        {txData, signatureId},
        {headers: {'x-api-key': process.env.TATUM_API_KEY}})).data;
};

export const xlmGetCurrentBlock = async () => {
    return (await axios.get('https://api.tatum.io/v3/xlm/info', {headers: {'x-api-key': process.env.TATUM_API_KEY}})).data;
};

export const xlmGetFee = async () => {
    return (await axios.get('https://api.tatum.io/v3/xlm/fee', {headers: {'x-api-key': process.env.TATUM_API_KEY}})).data;
};

export const xlmGetLedger = async (i: number) => {
    return (await axios.get(`https://api.tatum.io/v3/xlm/ledger/${i}`, {headers: {'x-api-key': process.env.TATUM_API_KEY}})).data;
};

export const xlmGetLedgerTx = async (i: number) => {
    return (await axios.get(`https://api.tatum.io/v3/xlm/ledger/${i}/transaction`, {headers: {'x-api-key': process.env.TATUM_API_KEY}})).data;
};

export const xlmGetAccount = async (address: string) => {
    return (await axios.get(`https://api.tatum.io/v3/xlm/account/${address}`, {headers: {'x-api-key': process.env.TATUM_API_KEY}})).data;
};

export const xlmGetTransaction = async (hash: string) => {
    return (await axios.get(`https://api.tatum.io/v3/xlm/transaction/${hash}`, {headers: {'x-api-key': process.env.TATUM_API_KEY}})).data;
};

export const xlmGetAccountTransactions = async (address: string) => {
    return (await axios.get(`https://api.tatum.io/v3/xlm/account/tx/${address}`, {headers: {'x-api-key': process.env.TATUM_API_KEY}})).data;
};