import { get, post } from '../connector/tatum';
import { TezosBlockChainInfo, TransactionHash, TezosAccount, TezosBlock, TezosTransaction } from '../model';

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/TezosBroadcast" target="_blank">Tatum API documentation</a>
 */
export const TezosBroadcast = async (txData: string, providerUrl?: string): Promise<TransactionHash> =>
  post(`/v3/tezos/broadcast`, { txData, providerUrl });

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/TezosGetBlockChainInfo" target="_blank">Tatum API documentation</a>
 */
export const TezosGetBlockChainInfo = async (): Promise<TezosBlockChainInfo> => get(`/v3/tezos/info`);

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/TezosGetBlock" target="_blank">Tatum API documentation</a>
 */
export const TezosGetBlock = async (hash: string): Promise<TezosBlock> => get(`/v3/tezos/block/${hash}`);

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/TezosGetTransaction" target="_blank">Tatum API documentation</a>
 */
export const TezosGetTransaction = async (hash: string): Promise<TezosTransaction> => get(`/v3/tezos/transaction/${hash}`);

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/TezosGetAccount" target="_blank">Tatum API documentation</a>
 */
export const TezosGetAccount = async (address: string): Promise<TezosAccount> => get(`/v3/tezos/account/${address}`);

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/TezosGetTransactionsByAccount" target="_blank">Tatum API documentation</a>
 */
export const TezosGetTransactionsByAccount = async (address: string, pageSize: number, offset: number): Promise<TezosTransaction[]> =>
  get(`/v3/tezos/account/${address}/transactions?pageSize=${pageSize}&offset=${offset}`);
