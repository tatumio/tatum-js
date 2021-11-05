import {qtumBroadcast} from '../blockchain';
import {Currency} from '@tatumio/tatum-core'

export const helperBroadcastTx = async (chain: Currency, txData: string, signatureId?: string) => {
    return await qtumBroadcast(txData)
};
