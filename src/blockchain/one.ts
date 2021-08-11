import {get,post} from '../connector/tatum';
import {OneTx, TransactionHash} from '../model';

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/OneBroadcast" target="_blank">Tatum API documentation</a>
 */
export const oneBroadcast = async (txData: string, signatureId?: string): Promise<TransactionHash> =>
    post(`/v3/one/broadcast`, {txData, signatureId});
/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/OneGetCurrentBlock" target="_blank">Tatum API documentation</a>
 */
export const oneGetCurrentBlock = async (): Promise<number> => get(`/v3/one/block/current`);

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/OneGetBlock" target="_blank">Tatum API documentation</a>
 */
export const oneGetBlock = async (hash: string): Promise<any> => get(`/v3/one/block/${hash}`);

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/OneGetBalance" target="_blank">Tatum API documentation</a>
 */
export const oneGetBalance = async (address: string): Promise<string> => get(`v3/one/account/balance/${address}`);
/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/OneGetTransaction" target="_blank">Tatum API documentation</a>
 */
export const oneGetTransaction = async (hash: string): Promise<OneTx> => get(`/v3/one/transaction/${hash}`);
/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/OneGetBalance" target="_blank">Tatum API documentation</a>
 */
 export const oneGetTransactionCount = async (address: string): Promise<number> => get(`v3/one/transaction/count/${address}`);
 /**