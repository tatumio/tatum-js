import {post} from '../connector/tatum';
import {TransactionHash} from '../model';

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/OneBroadcast" target="_blank">Tatum API documentation</a>
 */
export const oneBroadcast = async (txData: string, signatureId?: string): Promise<TransactionHash> =>
    post(`/v3/one/broadcast`, {txData, signatureId});
