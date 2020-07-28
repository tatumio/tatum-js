import axios from 'axios';
import {validateOrReject} from 'class-validator';
import {TATUM_API_URL} from '../constants';
import {EstimateGasVet, TransactionHash, VetBlock, VetEstimateGas, VetTx, VetTxReceipt} from '../model';

export const vetBroadcast = async (txData: string, signatureId?: string): Promise<TransactionHash> => {
    return (await axios.post(`${process.env.TATUM_API_URL || TATUM_API_URL}/v3/vet/broadcast`,
        {txData, signatureId},
        {headers: {'x-api-key': process.env.TATUM_API_KEY}})).data;
};

export const vetEstimateGas = async (body: EstimateGasVet): Promise<VetEstimateGas> => {
    await validateOrReject(body);
    return (await axios.post(`${process.env.TATUM_API_URL || TATUM_API_URL}/v3/vet/broadcast/transaction/gas`,
        body,
        {headers: {'x-api-key': process.env.TATUM_API_KEY}})).data;
};

export const vetGetCurrentBlock = async (): Promise<number> => {
    return (await axios.get(`${process.env.TATUM_API_URL || TATUM_API_URL}/v3/vet/current`, {headers: {'x-api-key': process.env.TATUM_API_KEY}})).data;
};

export const vetGetBlock = async (hash: string): Promise<VetBlock> => {
    return (await axios.get(`${process.env.TATUM_API_URL || TATUM_API_URL}/v3/vet/block/${hash}`, {headers: {'x-api-key': process.env.TATUM_API_KEY}})).data;
};

export const vetGetAccountBalance = async (address: string): Promise<number> => {
    return (await axios.get(`${process.env.TATUM_API_URL || TATUM_API_URL}/v3/vet/account/balance/${address}`, {headers: {'x-api-key': process.env.TATUM_API_KEY}})).data;
};

export const vetGetAccountEnergy = async (address: string): Promise<number> => {
    return (await axios.get(`${process.env.TATUM_API_URL || TATUM_API_URL}/v3/vet/account/energy/${address}`, {headers: {'x-api-key': process.env.TATUM_API_KEY}})).data;
};

export const vetGetTransaction = async (hash: string): Promise<VetTx> => {
    return (await axios.get(`${process.env.TATUM_API_URL || TATUM_API_URL}/v3/vet/transaction/${hash}`, {headers: {'x-api-key': process.env.TATUM_API_KEY}})).data;
};

export const vetGetTransactionReceipt = async (hash: string): Promise<VetTxReceipt> => {
    return (await axios.get(`${process.env.TATUM_API_URL || TATUM_API_URL}/v3/vet/transaction/${hash}/receipt`, {headers: {'x-api-key': process.env.TATUM_API_KEY}})).data;
};
