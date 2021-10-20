import {ClassType} from 'class-transformer/ClassTransformer';
import {Currency, listing} from '@tatumio/tatum-core';
import Web3 from 'web3';

export const helperBroadcastTx = async (chain: Currency, txData: string, signatureId?: string) => {
    throw new Error(`Unsupported chain ${chain}`);
};

export const helperGetWeb3Client = (testnet: boolean, chain: Currency, provider?: string): Web3 => {
    throw new Error(`Unsupported chain ${chain}`);
};

// eslint-disable-next-line @typescript-eslint/ban-types
export const helperPrepareSCCall = async (testnet: boolean, body: any, clazz: ClassType<object>, methodName: string, params: any[], methodSig?: string,
                                          provider?: string, abi: any[] = listing.abi) => {
    throw new Error(`Unsupported combination of inputs at ${body.chain || 'blockchain'}`);
};
