import {qtumBroadcast} from '../blockchain';

export const helperBroadcastTx = async (txData: string) => {
    return await qtumBroadcast(txData)
};
