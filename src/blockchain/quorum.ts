import { get, post } from '../connector/tatum'
import {QuorumBlock, QuorumTx, QuorumTxReceipt} from '../model';
import {AccountPassword} from '../model';

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/QuorumGetCurrentBlock" target="_blank">Tatum API documentation</a>
 */
export const quorumGetCurrentBlock = async (): Promise<number> => get(`/v3/quorum/block/current`);

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/QuorumGetBlock" target="_blank">Tatum API documentation</a>
 */
export const quorumGetBlock = async (hash: string): Promise<QuorumBlock> => get(`/v3/quorum/block/${hash}`);

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/QuorumGetTransaction" target="_blank">Tatum API documentation</a>
 */
export const quorumGetTransaction = async (hash: string): Promise<QuorumTx> => get(`/v3/quorum/transaction/${hash}`);

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/QuorumGetTransactionReceipt" target="_blank">Tatum API documentation</a>
 */
export const quorumGetTransactionReceipt = async (hash: string): Promise<QuorumTxReceipt> => get(`/v3/quorum/transaction/${hash}/receipt`);

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/QuorumGenerateAccount" target="_blank">Tatum API documentation</a>
 */
export const quorumCreateAccount = async (body: AccountPassword): Promise<{ success: boolean }> => post(`/v3/quorum/account`, body, AccountPassword);

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/QuorumUnlockAccount" target="_blank">Tatum API documentation</a>
 */
export const quorumUnlockAccount = async (address: string, body: AccountPassword): Promise<{ success: boolean }> =>
  post(`/v3/quorum/account/${address}/unlock`, body, AccountPassword);
