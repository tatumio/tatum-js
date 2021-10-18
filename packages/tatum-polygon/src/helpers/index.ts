import { buildSmartContractMethodInvocation, Currency, listing } from '@tatumio/tatum-core';
import {ClassType} from 'class-transformer/ClassTransformer';
import { preparePolygonClient, preparePolygonSmartContractWriteMethodInvocation } from 'src';
import { polygonBroadcast } from '../blockchain/polygon';
import Web3 from 'web3';

export const helperBroadcastTx = async (chain: Currency, txData: string, signatureId?: string) => {
    return await polygonBroadcast(txData, signatureId);
};

export const helperGetWeb3Client = (testnet: boolean, chain: Currency, provider?: string): Web3 => {
    return preparePolygonClient(testnet, provider);
};

// eslint-disable-next-line @typescript-eslint/ban-types
export const helperPrepareSCCall = async (testnet: boolean, body: any, clazz: ClassType<object>, methodName: string, params: any[], methodSig?: string,
                                          provider?: string, abi: any[] = listing.abi) => {
    const r = buildSmartContractMethodInvocation(body, params, methodName, abi)
    return await preparePolygonSmartContractWriteMethodInvocation(testnet, r, provider);                                  
};
