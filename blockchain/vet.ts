import axios from 'axios';
import {validateOrReject} from 'class-validator';
import {EstimateGasVet} from '../model/request/EstimateGasVet';
import {TransactionHash} from '../model/response/common/TransactionHash';
import {VetBlock} from '../model/response/vet/VetBlock';
import {VetEstimateGas} from '../model/response/vet/VetEstimateGas';
import {VetTx} from '../model/response/vet/VetTx';
import {VetTxReceipt} from '../model/response/vet/VetTxReceipt';

export const vetBroadcast = async (txData: string): Promise<TransactionHash> => {
    return (await axios.post(`https://api.tatum.io/v3/vet/broadcast`,
        {txData},
        {headers: {'x-api-key': process.env.TATUM_API_KEY}})).data;
};

export const vetEstimateGas = async (body: EstimateGasVet): Promise<VetEstimateGas> => {
    await validateOrReject(body);
    return (await axios.post(`https://api.tatum.io/v3/vet/broadcast/transaction/gas`,
        body,
        {headers: {'x-api-key': process.env.TATUM_API_KEY}})).data;
};

export const vetGetCurrentBlock = async (): Promise<number> => {
    return (await axios.get('https://api.tatum.io/v3/vet/current', {headers: {'x-api-key': process.env.TATUM_API_KEY}})).data;
};

export const vetGetBlock = async (hash: string): Promise<VetBlock> => {
    return (await axios.get(`https://api.tatum.io/v3/vet/block/${hash}`, {headers: {'x-api-key': process.env.TATUM_API_KEY}})).data;
};

export const vetGetAccountBalance = async (address: string): Promise<number> => {
    return (await axios.get(`https://api.tatum.io/v3/vet/account/balance/${address}`, {headers: {'x-api-key': process.env.TATUM_API_KEY}})).data;
};

export const vetGetAccountEnergy = async (address: string): Promise<number> => {
    return (await axios.get(`https://api.tatum.io/v3/vet/account/energy/${address}`, {headers: {'x-api-key': process.env.TATUM_API_KEY}})).data;
};

export const vetGetTransaction = async (hash: string): Promise<VetTx> => {
    return (await axios.get(`https://api.tatum.io/v3/vet/transaction/${hash}`, {headers: {'x-api-key': process.env.TATUM_API_KEY}})).data;
};

export const vetGetTransactionReceipt = async (hash: string): Promise<VetTxReceipt> => {
    return (await axios.get(`https://api.tatum.io/v3/vet/transaction/${hash}/receipt`, {headers: {'x-api-key': process.env.TATUM_API_KEY}})).data;
};
