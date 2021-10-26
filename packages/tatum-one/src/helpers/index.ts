import { buildSmartContractMethodInvocation, Currency, listing } from '@tatumio/tatum-core';
import {ClassType} from 'class-transformer/ClassTransformer';
import { oneBroadcast } from 'src';
import Web3 from 'web3';
import {
    prepareOneClient,
    prepareOneSmartContractWriteMethodInvocation,
} from '../transaction';

export const helperBroadcastTx = async (chain: Currency, txData: string, signatureId?: string) => {
    return await oneBroadcast(txData, signatureId);
};

export const helperGetWeb3Client = (testnet: boolean, chain: Currency, provider?: string): Web3 => {
    return prepareOneClient(testnet, provider);
};

// eslint-disable-next-line @typescript-eslint/ban-types
export const helperPrepareSCCall = async (testnet: boolean, body: any, clazz: ClassType<object>, methodName: string, params: any[], methodSig?: string,
                                          provider?: string, abi: any[] = listing.abi) => {
    const r = buildSmartContractMethodInvocation(body, params, methodName, abi)
    return await prepareOneSmartContractWriteMethodInvocation(testnet, r, provider);
};
