import {algorandBroadcast} from '../blockchain';
import {Currency} from '@tatumio/tatum-core';

export const helperBroadcastTx = async (chain: Currency, txData: string, signatureId?: string) => {
    return await algorandBroadcast(txData, signatureId);
};
