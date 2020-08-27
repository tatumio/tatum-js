import axios from 'axios';
import {TATUM_API_URL} from '../constants';
import {EthBlock, EthTx, TransactionHash} from '../model';

/**
 * For more details, see <a href="https://tatum.io/apidoc.html#operation/EthBroadcast" target="_blank">Tatum API documentation</a>
 */
export const ethBroadcast = async (txData: string, signatureId?: string): Promise<TransactionHash> => {
    return (await axios.post(`${process.env.TATUM_API_URL || TATUM_API_URL}/v3/ethereum/broadcast`,
        {txData, signatureId},
        {headers: {'x-api-key': process.env.TATUM_API_KEY}})).data;
};

/**
 * For more details, see <a href="https://tatum.io/apidoc.html#operation/EthGetTransactionCount" target="_blank">Tatum API documentation</a>
 */
export const ethGetTransactionsCount = async (address: string): Promise<number> => {
    return (await axios.get(`${process.env.TATUM_API_URL || TATUM_API_URL}/v3/ethereum/transaction/count/${address}`,
        {headers: {'x-api-key': process.env.TATUM_API_KEY}})).data;
};

/**
 * For more details, see <a href="https://tatum.io/apidoc.html#operation/EthGetCurrentBlock" target="_blank">Tatum API documentation</a>
 */
export const ethGetCurrentBlock = async (): Promise<number> => {
    return (await axios.get(`${process.env.TATUM_API_URL || TATUM_API_URL}/v3/ethereum/block/current`, {headers: {'x-api-key': process.env.TATUM_API_KEY}})).data;
};

/**
 * For more details, see <a href="https://tatum.io/apidoc.html#operation/EthGetBlock" target="_blank">Tatum API documentation</a>
 */
export const ethGetBlock = async (hash: string): Promise<EthBlock> => {
    return (await axios.get(`${process.env.TATUM_API_URL || TATUM_API_URL}/v3/ethereum/block/${hash}`, {headers: {'x-api-key': process.env.TATUM_API_KEY}})).data;
};

/**
 * For more details, see <a href="https://tatum.io/apidoc.html#operation/EthGetBalance" target="_blank">Tatum API documentation</a>
 */
export const ethGetAccountBalance = async (address: string): Promise<number> => {
    return (await axios.get(`${process.env.TATUM_API_URL || TATUM_API_URL}/v3/ethereum/account/balance/${address}`, {headers: {'x-api-key': process.env.TATUM_API_KEY}})).data;
};

/**
 * For more details, see <a href="https://tatum.io/apidoc.html#operation/EthErc20GetBalance" target="_blank">Tatum API documentation</a>
 */
export const ethGetAccountErc20Address = async (address: string, contractAddress: string): Promise<number> => {
    return (await axios.get(`${process.env.TATUM_API_URL || TATUM_API_URL}/v3/ethereum/account/balance/erc20/${address}?contractAddress=${contractAddress}`,
        {headers: {'x-api-key': process.env.TATUM_API_KEY}})).data;
};

/**
 * For more details, see <a href="https://tatum.io/apidoc.html#operation/EthGetTransaction" target="_blank">Tatum API documentation</a>
 */
export const ethGetTransaction = async (hash: string): Promise<EthTx> => {
    return (await axios.get(`${process.env.TATUM_API_URL || TATUM_API_URL}/v3/ethereum/transaction/${hash}`, {headers: {'x-api-key': process.env.TATUM_API_KEY}})).data;
};

/**
 * For more details, see <a href="https://tatum.io/apidoc.html#operation/EthGetTransactionByAddress" target="_blank">Tatum API documentation</a>
 */
export const ethGetAccountTransactions = async (address: string, pageSize = 50, offset = 0): Promise<EthTx[]> => {
    return (await axios.get(`${process.env.TATUM_API_URL || TATUM_API_URL}/v3/ethereum/account/transaction/${address}?pageSize=${pageSize}&offset=${offset}`,
        {headers: {'x-api-key': process.env.TATUM_API_KEY}})).data;
};