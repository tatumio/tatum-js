import axios from 'axios';
import {validateOrReject} from 'class-validator';
import {TATUM_API_URL} from '../constants';
import {QuorumBlock, QuorumTx, QuorumTxReceipt} from '../model';
import {AccountPassword} from '../model/request/AccountPassword';

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/QuorumGetCurrentBlock" target="_blank">Tatum API documentation</a>
 */
export const quorumGetCurrentBlock = async (): Promise<number> => {
    return (await axios.get(`${process.env.TATUM_API_URL || TATUM_API_URL}/v3/quorum/block/current`, {headers: {'x-api-key': process.env.TATUM_API_KEY}})).data;
};

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/QuorumGetBlock" target="_blank">Tatum API documentation</a>
 */
export const quorumGetBlock = async (hash: string): Promise<QuorumBlock> => {
    return (await axios.get(`${process.env.TATUM_API_URL || TATUM_API_URL}/v3/quorum/block/${hash}`, {headers: {'x-api-key': process.env.TATUM_API_KEY}})).data;
};

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/QuorumGetTransaction" target="_blank">Tatum API documentation</a>
 */
export const quorumGetTransaction = async (hash: string): Promise<QuorumTx> => {
    return (await axios.get(`${process.env.TATUM_API_URL || TATUM_API_URL}/v3/quorum/transaction/${hash}`, {headers: {'x-api-key': process.env.TATUM_API_KEY}})).data;
};

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/QuorumGetTransactionReceipt" target="_blank">Tatum API documentation</a>
 */
export const quorumGetTransactionReceipt = async (hash: string): Promise<QuorumTxReceipt> => {
    return (await axios.get(`${process.env.TATUM_API_URL || TATUM_API_URL}/v3/quorum/transaction/${hash}/receipt`, {headers: {'x-api-key': process.env.TATUM_API_KEY}})).data;
};

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/QuorumGenerateAccount" target="_blank">Tatum API documentation</a>
 */
export const quorumCreateAccount = async (body: AccountPassword): Promise<{ success: boolean }> => {
    await validateOrReject(body);
    return (await axios.post(`${process.env.TATUM_API_URL || TATUM_API_URL}/v3/quorum/account`, body, {headers: {'x-api-key': process.env.TATUM_API_KEY}})).data;
};

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/QuorumUnlockAccount" target="_blank">Tatum API documentation</a>
 */
export const quorumUnlockAccount = async (address: string, body: AccountPassword): Promise<{ success: boolean }> => {
    await validateOrReject(body);
    return (await axios.post(`${process.env.TATUM_API_URL || TATUM_API_URL}/v3/quorum/account/${address}/unlock`, body, {headers: {'x-api-key': process.env.TATUM_API_KEY}})).data;
};
