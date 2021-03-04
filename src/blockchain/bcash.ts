import { get, post } from '../connector/tatum'
import {BchBlock, BchInfo, BchTx, BlockHash, TransactionHash} from '../model';

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/BchBroadcast" target="_blank">Tatum API documentation</a>
 */
export const bcashBroadcast = async (txData: string, signatureId?: string): Promise<TransactionHash> =>
  post(`/v3/bcash/broadcast`, { txData, signatureId });

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/BchGetBlockChainInfo" target="_blank">Tatum API documentation</a>
 */
export const bcashGetCurrentBlock = async (): Promise<BchInfo> => get(`/v3/bcash/info`)

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/BchGetBlock" target="_blank">Tatum API documentation</a>
 */
export const bcashGetBlock = async (hash: string): Promise<BchBlock> => get(`/v3/bcash/block/${hash}`)

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/BchGetBlockHash" target="_blank">Tatum API documentation</a>
 */
export const bcashGetBlockHash = async (i: number): Promise<BlockHash> => get(`/v3/bcash/block/hash/${i}`);

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/BchGetTxByAddress" target="_blank">Tatum API documentation</a>
 */
export const bcashGetTxForAccount = async (address: string, skip: number = 0): Promise<BchTx[]> =>
  get(`/v3/bcash/transaction/address/${address}?skip=${skip}`);

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/BchGetRawTransaction" target="_blank">Tatum API documentation</a>
 */
export const bcashGetTransaction = async (hash: string): Promise<BchTx> => get(`/v3/bcash/transaction/${hash}`);