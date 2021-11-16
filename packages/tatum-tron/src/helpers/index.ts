import {tronBroadcast} from '../blockchain';

export const helperBroadcastTx = async (txData: string, signatureId?: string) => {
    return await tronBroadcast(txData, signatureId);
};

