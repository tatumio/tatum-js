import axios from 'axios';
import {TATUM_API_URL} from '../constants';
import {TransactionHash, TronAccount, TronBlock, TronTransaction, TronTransactionInBlock} from '../model';

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/TronBroadcast" target="_blank">Tatum API documentation</a>
 */
export const tronBroadcast = async (txData: string, signatureId?: string): Promise<TransactionHash> => {
    return (await axios.post(`${process.env.TATUM_API_URL || TATUM_API_URL}/v3/tron/broadcast`,
        {txData, signatureId},
        {headers: {'x-api-key': process.env.TATUM_API_KEY}})).data;
};

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/TronGetCurrentBlock" target="_blank">Tatum API documentation</a>
 */
export const tronGetCurrentBlock = async (): Promise<{ testnet: boolean, hash: string, blockNumber: number }> => {
    return (await axios.get(`${process.env.TATUM_API_URL || TATUM_API_URL}/v3/tron/current`, {headers: {'x-api-key': process.env.TATUM_API_KEY}})).data;
};

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/TronGetBlock" target="_blank">Tatum API documentation</a>
 */
export const tronGetBlock = async (hash: string): Promise<TronBlock> => {
    return (await axios.get(`${process.env.TATUM_API_URL || TATUM_API_URL}/v3/tron/block/${hash}`, {headers: {'x-api-key': process.env.TATUM_API_KEY}})).data;
};

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/TronGetTransaction" target="_blank">Tatum API documentation</a>
 */
export const tronGetTransaction = async (hash: string): Promise<TronTransaction> => {
    return (await axios.get(`${process.env.TATUM_API_URL || TATUM_API_URL}/v3/tron/transaction/${hash}`, {headers: {'x-api-key': process.env.TATUM_API_KEY}})).data;
};

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/TronGetTransactionsInBlock" target="_blank">Tatum API documentation</a>
 */
export const tronGetTransactionsInBlock = async (block: number): Promise<TronTransactionInBlock[]> => {
    return (await axios.get(`${process.env.TATUM_API_URL || TATUM_API_URL}/v3/tron/transaction/${block}`, {headers: {'x-api-key': process.env.TATUM_API_KEY}})).data;
};

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/TronGetAccount" target="_blank">Tatum API documentation</a>
 */
export const tronGetAccount = async (address: string): Promise<TronAccount> => {
    return (await axios.get(`${process.env.TATUM_API_URL || TATUM_API_URL}/v3/tron/account/${address}`, {headers: {'x-api-key': process.env.TATUM_API_KEY}})).data;
};
