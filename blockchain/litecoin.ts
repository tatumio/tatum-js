import axios from 'axios';
import {BlockHash} from '../model/response/common/BlockHash';
import {TransactionHash} from '../model/response/common/TransactionHash';
import {LtcBlock} from '../model/response/ltc/LtcBlock';
import {LtcInfo} from '../model/response/ltc/LtcInfo';
import {LtcTx} from '../model/response/ltc/LtcTx';
import {LtcUTXO} from '../model/response/ltc/LtxUTXO';

export const ltcBroadcast = async (txData: string): Promise<TransactionHash> => {
    return (await axios.post(`https://api.tatum.io/v3/litecoin/broadcast`,
        {txData},
        {headers: {'x-api-key': process.env.TATUM_API_KEY}})).data;
};

export const ltcGetCurrentBlock = async (): Promise<LtcInfo> => {
    return (await axios.get('https://api.tatum.io/v3/litecoin/info', {headers: {'x-api-key': process.env.TATUM_API_KEY}})).data;
};

export const ltcGetBlock = async (hash: string): Promise<LtcBlock> => {
    return (await axios.get(`https://api.tatum.io/v3/litecoin/block/${hash}`, {headers: {'x-api-key': process.env.TATUM_API_KEY}})).data;
};

export const ltcGetBlockHash = async (i: number): Promise<BlockHash> => {
    return (await axios.get(`https://api.tatum.io/v3/litecoin/block/hash/${i}`, {headers: {'x-api-key': process.env.TATUM_API_KEY}})).data;
};

export const ltcGetUTXO = async (hash: string, i: number): Promise<LtcUTXO> => {
    return (await axios.get(`https://api.tatum.io/v3/litecoin/utxo/${hash}/${i}`, {headers: {'x-api-key': process.env.TATUM_API_KEY}})).data;
};

export const ltcGetTxForAccount = async (address: string, pageSize: number = 50, offset: number = 0): Promise<LtcTx[]> => {
    return (await axios.get(`https://api.tatum.io/v3/litecoin/transaction/address/${address}?pageSize=${pageSize}&offset=${offset}`,
        {headers: {'x-api-key': process.env.TATUM_API_KEY}})).data;
};

export const ltcGetTransaction = async (hash: string): Promise<LtcTx> => {
    return (await axios.get(`https://api.tatum.io/v3/litecoin/transaction/${hash}`, {headers: {'x-api-key': process.env.TATUM_API_KEY}})).data;
};