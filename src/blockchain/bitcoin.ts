import axios from 'axios';
import {TATUM_API_URL} from '../constants';
import {BlockHash, BtcBlock, BtcInfo, BtcTx, BtcUTXO, TransactionHash} from '../model';

/**
 * For more details, see <a href="https://tatum.io/apidoc.html#operation/BtcBroadcast" target="_blank">Tatum API documentation</a>
 */
export const btcBroadcast = async (txData: string, signatureId?: string): Promise<TransactionHash> => {
    return (await axios.post(`${process.env.TATUM_API_URL || TATUM_API_URL}/v3/bitcoin/broadcast`,
        {txData, signatureId},
        {headers: {'x-api-key': process.env.TATUM_API_KEY}})).data;
};

/**
 * For more details, see <a href="https://tatum.io/apidoc.html#operation/BtcGetBlockChainInfo" target="_blank">Tatum API documentation</a>
 */
export const btcGetCurrentBlock = async (): Promise<BtcInfo> => {
    return (await axios.get(`${process.env.TATUM_API_URL || TATUM_API_URL}/v3/bitcoin/info`, {headers: {'x-api-key': process.env.TATUM_API_KEY}})).data;
};

/**
 * For more details, see <a href="https://tatum.io/apidoc.html#operation/BtcGetBlock" target="_blank">Tatum API documentation</a>
 */
export const btcGetBlock = async (hash: string): Promise<BtcBlock> => {
    return (await axios.get(`${process.env.TATUM_API_URL || TATUM_API_URL}/v3/bitcoin/block/${hash}`, {headers: {'x-api-key': process.env.TATUM_API_KEY}})).data;
};

/**
 * For more details, see <a href="https://tatum.io/apidoc.html#operation/BtcGetBlockHash" target="_blank">Tatum API documentation</a>
 */
export const btcGetBlockHash = async (i: number): Promise<BlockHash> => {
    return (await axios.get(`${process.env.TATUM_API_URL || TATUM_API_URL}/v3/bitcoin/block/hash/${i}`, {headers: {'x-api-key': process.env.TATUM_API_KEY}})).data;
};

/**
 * For more details, see <a href="https://tatum.io/apidoc.html#operation/BtcGetUTXO" target="_blank">Tatum API documentation</a>
 */
export const btcGetUTXO = async (hash: string, i: number): Promise<BtcUTXO> => {
    return (await axios.get(`${process.env.TATUM_API_URL || TATUM_API_URL}/v3/bitcoin/utxo/${hash}/${i}`, {headers: {'x-api-key': process.env.TATUM_API_KEY}})).data;
};

/**
 * For more details, see <a href="https://tatum.io/apidoc.html#operation/BtcGetTxByAddress" target="_blank">Tatum API documentation</a>
 */
export const btcGetTxForAccount = async (address: string, pageSize: number = 50, offset: number = 0): Promise<BtcTx[]> => {
    return (await axios.get(`${process.env.TATUM_API_URL || TATUM_API_URL}/v3/bitcoin/transaction/address/${address}?pageSize=${pageSize}&offset=${offset}`,
        {headers: {'x-api-key': process.env.TATUM_API_KEY}})).data;
};

/**
 * For more details, see <a href="https://tatum.io/apidoc.html#operation/BtcGetRawTransaction" target="_blank">Tatum API documentation</a>
 */
export const btcGetTransaction = async (hash: string): Promise<BtcTx> => {
    return (await axios.get(`${process.env.TATUM_API_URL || TATUM_API_URL}/v3/bitcoin/transaction/${hash}`, {headers: {'x-api-key': process.env.TATUM_API_KEY}})).data;
};