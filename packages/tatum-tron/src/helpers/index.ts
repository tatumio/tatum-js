import Web3 from 'web3';
import {tronBroadcast} from '../blockchain';
import {Currency} from '../model';
import {
    getClient
} from "../../../../src";

export const helperBroadcastTx = async (chain: Currency, txData: string, signatureId?: string) => {
    return await tronBroadcast(txData, signatureId);
};

export const helperGetWeb3Client = (testnet: boolean, chain: Currency, provider?: string): Web3 => {
    return getClient(provider);
};
