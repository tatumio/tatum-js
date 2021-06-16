import {get, post} from '../connector/tatum';
import {
    AdaUtxo,
    AdaAccount,
    AdaBlock,
    AdaBlockChainInfo,
    AdaTransaction,
    TransactionHash
} from '../model';

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/CardanoBroadcast" target="_blank">Tatum API documentation</a>
 */
export const adaBroadcast = async (txData: string): Promise<TransactionHash> =>
    post(`/v3/ada/broadcast`, {txData});

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/CardanoGetBlockChainInfo" target="_blank">Tatum API documentation</a>
 */
export const adaGetBlockChainInfo = async (): Promise<AdaBlockChainInfo> => get(`/v3/ada/info`);

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/CardanoGetBlock" target="_blank">Tatum API documentation</a>
 */
export const adaGetBlock = async (hash: string): Promise<AdaBlock> => get(`/v3/ada/block/${hash}`);

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/CardanoGetTransaction" target="_blank">Tatum API documentation</a>
 */
export const adaGetTransaction = async (hash: string): Promise<AdaTransaction> => get(`/v3/ada/transaction/${hash}`);

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/CardanoGetAccount" target="_blank">Tatum API documentation</a>
 */
export const adaGetAccount = async (address: string): Promise<AdaAccount> => get(`/v3/ada/account/${address}`);

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/CardanoGetTransactionsByAccount" target="_blank">Tatum API documentation</a>
 */
export const adaGetTransactionsByAccount = async (address: string, limit: number, offset: number): Promise<AdaTransaction[]> =>
  get(`/v3/ada/account/${address}/transactions?limit=${limit}?offset=${offset}`);

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/CardanoGetUTxos" target="_blank">Tatum API documentation</a>
 */
export const adaGetUtxos = async (address: string): Promise<AdaUtxo[]> => get(`/v3/ada/utxo/${address}`);
