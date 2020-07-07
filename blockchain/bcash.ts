import axios from 'axios';
import {BchBlock} from '../model/response/bch/BchBlock';
import {BchInfo} from '../model/response/bch/BchInfo';
import {BchTx} from '../model/response/bch/BchTx';
import {BlockHash} from '../model/response/common/BlockHash';
import {TransactionHash} from '../model/response/common/TransactionHash';

export const bcashBroadcast = async (txData: string): Promise<TransactionHash> => {
    return (await axios.post(`https://api.tatum.io/v3/bcash/broadcast`,
        {txData},
        {headers: {'x-api-key': process.env.TATUM_API_KEY}})).data;
};

export const bcashGetCurrentBlock = async (): Promise<BchInfo> => {
    return (await axios.get('https://api.tatum.io/v3/bcash/info', {headers: {'x-api-key': process.env.TATUM_API_KEY}})).data;
};

export const bcashGetBlock = async (hash: string): Promise<BchBlock> => {
    return (await axios.get(`https://api.tatum.io/v3/bcash/block/${hash}`, {headers: {'x-api-key': process.env.TATUM_API_KEY}})).data;
};

export const bcashGetBlockHash = async (i: number): Promise<BlockHash> => {
    return (await axios.get(`https://api.tatum.io/v3/bcash/block/hash/${i}`, {headers: {'x-api-key': process.env.TATUM_API_KEY}})).data;
};

export const bcashGetTxForAccount = async (address: string, skip: number = 0): Promise<BchTx[]> => {
    return (await axios.get(`https://api.tatum.io/v3/bcash/transaction/address/${address}?skip=${skip}`, {headers: {'x-api-key': process.env.TATUM_API_KEY}})).data;
};

export const bcashGetTransaction = async (hash: string): Promise<BchTx> => {
    return (await axios.get(`https://api.tatum.io/v3/bcash/transaction/${hash}`, {headers: {'x-api-key': process.env.TATUM_API_KEY}})).data;
};