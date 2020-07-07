import axios from 'axios';
import {TransactionHash} from '../model/response/common/TransactionHash';
import {EthBlock} from '../model/response/eth/EthBlock';
import {EthTx} from '../model/response/eth/EthTx';

export const ethBroadcast = async (txData: string): Promise<TransactionHash> => {
    return (await axios.post(`https://api.tatum.io/v3/ethereum/broadcast`,
        {txData},
        {headers: {'x-api-key': process.env.TATUM_API_KEY}})).data;
};

export const ethGetTransactionsCount = async (address: string): Promise<number> => {
    return (await axios.get(`https://api.tatum.io/v3/ethereum/transaction/count/${address}`,
        {headers: {'x-api-key': process.env.TATUM_API_KEY}})).data;
};

export const ethGetCurrentBlock = async (): Promise<number> => {
    return (await axios.get('https://api.tatum.io/v3/eth/current', {headers: {'x-api-key': process.env.TATUM_API_KEY}})).data;
};

export const ethGetBlock = async (hash: string): Promise<EthBlock> => {
    return (await axios.get(`https://api.tatum.io/v3/eth/block/${hash}`, {headers: {'x-api-key': process.env.TATUM_API_KEY}})).data;
};

export const ethGetAccountBalance = async (address: string): Promise<number> => {
    return (await axios.get(`https://api.tatum.io/v3/eth/account/balance/${address}`, {headers: {'x-api-key': process.env.TATUM_API_KEY}})).data;
};

export const ethGetAccountErc20Address = async (address: string, contractAddress: string): Promise<number> => {
    return (await axios.get(`https://api.tatum.io/v3/eth/account/balance/erc20/${address}?contractAddress=${contractAddress}`,
        {headers: {'x-api-key': process.env.TATUM_API_KEY}})).data;
};

export const ethGetTransaction = async (hash: string): Promise<EthTx> => {
    return (await axios.get(`https://api.tatum.io/v3/eth/transaction/${hash}`, {headers: {'x-api-key': process.env.TATUM_API_KEY}})).data;
};
export const ethGetAccountTransactions = async (address: string, pageSize = 50, offset = 0): Promise<EthTx[]> => {
    return (await axios.get(`https://api.tatum.io/v3/eth/account/transaction/${address}?pageSize=${pageSize}&offset=${offset}`,
        {headers: {'x-api-key': process.env.TATUM_API_KEY}})).data;
};