import axios from 'axios';
import {TATUM_API_URL} from '../constants';
import {BlockHash, ScryptaBlock, ScryptaInfo, ScryptaTx, ScryptaUTXO, TransactionHash} from '../model';

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/BroadcastsignedScryptatransaction" target="_blank">Tatum API documentation</a>
 */
export const scryptaBroadcast = async (txData: string, signatureId?: string): Promise<TransactionHash> => {
    return (await axios.post(`${process.env.TATUM_API_URL || TATUM_API_URL}/v3/scrypta/broadcast`,
        {txData, signatureId},
        {headers: {'x-api-key': process.env.TATUM_API_KEY}})).data;
};

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/ScryptaGetBlockChainInfo" target="_blank">Tatum API documentation</a>
 */
export const scryptaGetCurrentBlock = async (): Promise<ScryptaInfo> => {
    return (await axios.get(`${process.env.TATUM_API_URL || TATUM_API_URL}/v3/scrypta/info`, {headers: {'x-api-key': process.env.TATUM_API_KEY}})).data;
};

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/ScryptaGetBlock" target="_blank">Tatum API documentation</a>
 */
export const scryptaGetBlock = async (hash: string): Promise<ScryptaBlock> => {
    return (await axios.get(`${process.env.TATUM_API_URL || TATUM_API_URL}/v3/scrypta/block/${hash}`, {headers: {'x-api-key': process.env.TATUM_API_KEY}})).data;
};

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/ScryptaGetBlockHash" target="_blank">Tatum API documentation</a>
 */
export const scryptaGetBlockHash = async (i: number): Promise<BlockHash> => {
    return (await axios.get(`${process.env.TATUM_API_URL || TATUM_API_URL}/v3/scrypta/block/hash/${i}`, {headers: {'x-api-key': process.env.TATUM_API_KEY}})).data;
};

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/ScryptaGetUTXO" target="_blank">Tatum API documentation</a>
 */
export const scryptaGetUTXO = async (hash: string, i: number): Promise<ScryptaUTXO> => {
    return (await axios.get(`${process.env.TATUM_API_URL || TATUM_API_URL}/v3/scrypta/utxo/${hash}/${i}`, {headers: {'x-api-key': process.env.TATUM_API_KEY}})).data;
};

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/ScryptaGetTxByAddress" target="_blank">Tatum API documentation</a>
 */
export const scryptaGetTxForAccount = async (address: string, pageSize: number = 50, offset: number = 0): Promise<ScryptaTx[]> => {
    return (await axios.get(`${process.env.TATUM_API_URL || TATUM_API_URL}/v3/scrypta/transaction/address/${address}?pageSize=${pageSize}&offset=${offset}`,
        {headers: {'x-api-key': process.env.TATUM_API_KEY}})).data;
};

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/ScryptaGetTxByAddress" target="_blank">Tatum API documentation</a>
 */
export const scryptaGetUnspentForAccount = async (address: string, pageSize: number = 50, offset: number = 0): Promise<ScryptaUTXO[]> => {
    return (await axios.get(`${process.env.TATUM_API_URL || TATUM_API_URL}/v3/scrypta/utxo/${address}?pageSize=${pageSize}&offset=${offset}`,
        {headers: {'x-api-key': process.env.TATUM_API_KEY}})).data;
};

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/ScryptaGetRawTransaction" target="_blank">Tatum API documentation</a>
 */
export const scryptaGetTransaction = async (hash: string): Promise<ScryptaTx> => {
    return (await axios.get(`${process.env.TATUM_API_URL || TATUM_API_URL}/v3/scrypta/transaction/${hash}`, {headers: {'x-api-key': process.env.TATUM_API_KEY}})).data;
};