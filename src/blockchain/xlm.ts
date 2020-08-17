import axios from 'axios';
import {TATUM_API_URL} from '../constants';
import {TransactionHash} from '../model';

/**
 * For more details, see <a href="https://tatum.io/apidoc.html#operation/XlmGetAccountInfo" target="_blank">Tatum API documentation</a>
 */
export const xlmGetAccountInfo = async (account: string): Promise<{ sequence: string }> => {
    return (await axios.get(`${process.env.TATUM_API_URL || TATUM_API_URL}/v3/xlm/account/${account}`, {headers: {'x-api-key': process.env.TATUM_API_KEY}})).data;
};

/**
 * For more details, see <a href="https://tatum.io/apidoc.html#operation/XlmBroadcast" target="_blank">Tatum API documentation</a>
 */
export const xlmBroadcast = async (txData: string, signatureId?: string): Promise<TransactionHash> => {
    return (await axios.post(`${process.env.TATUM_API_URL || TATUM_API_URL}/v3/xlm/broadcast`,
        {txData, signatureId},
        {headers: {'x-api-key': process.env.TATUM_API_KEY}})).data;
};

/**
 * For more details, see <a href="https://tatum.io/apidoc.html#operation/XlmGetLastClosedLedger" target="_blank">Tatum API documentation</a>
 */
export const xlmGetCurrentLedger = async () => {
    return (await axios.get(`${process.env.TATUM_API_URL || TATUM_API_URL}/v3/xlm/info`, {headers: {'x-api-key': process.env.TATUM_API_KEY}})).data;
};

/**
 * For more details, see <a href="https://tatum.io/apidoc.html#operation/XlmGetFee" target="_blank">Tatum API documentation</a>
 */
export const xlmGetFee = async () => {
    return (await axios.get(`${process.env.TATUM_API_URL || TATUM_API_URL}/v3/xlm/fee`, {headers: {'x-api-key': process.env.TATUM_API_KEY}})).data;
};

/**
 * For more details, see <a href="https://tatum.io/apidoc.html#operation/XlmGetLedger" target="_blank">Tatum API documentation</a>
 */
export const xlmGetLedger = async (i: number) => {
    return (await axios.get(`${process.env.TATUM_API_URL || TATUM_API_URL}/v3/xlm/ledger/${i}`, {headers: {'x-api-key': process.env.TATUM_API_KEY}})).data;
};

/**
 * For more details, see <a href="https://tatum.io/apidoc.html#operation/XlmGetLedgerTx" target="_blank">Tatum API documentation</a>
 */
export const xlmGetLedgerTx = async (i: number) => {
    return (await axios.get(`${process.env.TATUM_API_URL || TATUM_API_URL}/v3/xlm/ledger/${i}/transaction`, {headers: {'x-api-key': process.env.TATUM_API_KEY}})).data;
};

/**
 * For more details, see <a href="https://tatum.io/apidoc.html#operation/XlmGetTransaction" target="_blank">Tatum API documentation</a>
 */
export const xlmGetTransaction = async (hash: string) => {
    return (await axios.get(`${process.env.TATUM_API_URL || TATUM_API_URL}/v3/xlm/transaction/${hash}`, {headers: {'x-api-key': process.env.TATUM_API_KEY}})).data;
};

/**
 * For more details, see <a href="https://tatum.io/apidoc.html#operation/XlmGetAccountTx" target="_blank">Tatum API documentation</a>
 */
export const xlmGetAccountTransactions = async (address: string) => {
    return (await axios.get(`${process.env.TATUM_API_URL || TATUM_API_URL}/v3/xlm/account/tx/${address}`, {headers: {'x-api-key': process.env.TATUM_API_KEY}})).data;
};