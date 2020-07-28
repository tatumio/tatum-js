import axios from 'axios';
import {TATUM_API_URL} from '../constants';
import {BlockHash, LtcBlock, LtcInfo, LtcTx, LtcUTXO, TransactionHash} from '../model';

export const ltcBroadcast = async (txData: string, signatureId?: string): Promise<TransactionHash> => {
    return (await axios.post(`${process.env.TATUM_API_URL || TATUM_API_URL}/v3/litecoin/broadcast`,
        {txData, signatureId},
        {headers: {'x-api-key': process.env.TATUM_API_KEY}})).data;
};

export const ltcGetCurrentBlock = async (): Promise<LtcInfo> => {
    return (await axios.get(`${process.env.TATUM_API_URL || TATUM_API_URL}/v3/litecoin/info`, {headers: {'x-api-key': process.env.TATUM_API_KEY}})).data;
};

export const ltcGetBlock = async (hash: string): Promise<LtcBlock> => {
    return (await axios.get(`${process.env.TATUM_API_URL || TATUM_API_URL}/v3/litecoin/block/${hash}`, {headers: {'x-api-key': process.env.TATUM_API_KEY}})).data;
};

export const ltcGetBlockHash = async (i: number): Promise<BlockHash> => {
    return (await axios.get(`${process.env.TATUM_API_URL || TATUM_API_URL}/v3/litecoin/block/hash/${i}`, {headers: {'x-api-key': process.env.TATUM_API_KEY}})).data;
};

export const ltcGetUTXO = async (hash: string, i: number): Promise<LtcUTXO> => {
    return (await axios.get(`${process.env.TATUM_API_URL || TATUM_API_URL}/v3/litecoin/utxo/${hash}/${i}`, {headers: {'x-api-key': process.env.TATUM_API_KEY}})).data;
};

export const ltcGetTxForAccount = async (address: string, pageSize: number = 50, offset: number = 0): Promise<LtcTx[]> => {
    return (await axios.get(`${process.env.TATUM_API_URL || TATUM_API_URL}/v3/litecoin/transaction/address/${address}?pageSize=${pageSize}&offset=${offset}`,
        {headers: {'x-api-key': process.env.TATUM_API_KEY}})).data;
};

export const ltcGetTransaction = async (hash: string): Promise<LtcTx> => {
    return (await axios.get(`${process.env.TATUM_API_URL || TATUM_API_URL}/v3/litecoin/transaction/${hash}`, {headers: {'x-api-key': process.env.TATUM_API_KEY}})).data;
};