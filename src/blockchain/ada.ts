import {get, post} from '../connector/tatum';
import {
    AdaUTxo,
    CardanoAccount,
    CardanoBlock,
    CardanoBlockChainInfo,
    CardanoTransaction,
    TransactionHash
} from '../model';

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/CardanoBroadcast" target="_blank">Tatum API documentation</a>
 */
export const cardanoBroadcast = async (txData: string): Promise<TransactionHash> =>
    post(`/v3/cardano/broadcast`, {txData});

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/CardanoGetBlockChainInfo" target="_blank">Tatum API documentation</a>
 */
export const cardanoGetBlockChainInfo = async (): Promise<CardanoBlockChainInfo> => get(`/v3/cardano/info`);

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/CardanoGetBlock" target="_blank">Tatum API documentation</a>
 */
export const cardanoGetBlock = async (hash: string): Promise<CardanoBlock> => get(`/v3/cardano/block/${hash}`);

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/CardanoGetTransaction" target="_blank">Tatum API documentation</a>
 */
export const cardanoGetTransaction = async (hash: string): Promise<CardanoTransaction> => get(`/v3/cardano/transaction/${hash}`);

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/CardanoGetAccount" target="_blank">Tatum API documentation</a>
 */
export const cardanoGetAccount = async (address: string): Promise<CardanoAccount> => get(`/v3/cardano/account/${address}`);

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/CardanoGetTransactionsByAccount" target="_blank">Tatum API documentation</a>
 */
export const cardanoGetTransactionsByAccount = async (address: string, limit: number, offset: number): Promise<CardanoTransaction[]> =>
  get(`/v3/cardano/account/${address}/transactions?limit=${limit}?offset=${offset}`);

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/CardanoGetUTxos" target="_blank">Tatum API documentation</a>
 */
export const cardanoGetUTxos = async (address: string): Promise<AdaUTxo[]> => get(`/v3/cardano/${address}/utxos`);
