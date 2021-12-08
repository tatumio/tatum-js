import { get, post } from '@tatumio/tatum-core'
import { QuorumBlock, QuorumTx, QuorumTxReceipt } from '../model'
import { AccountPassword } from '../model'

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/QuorumGetCurrentBlock" target="_blank">Tatum API documentation</a>
 */
export const getCurrentBlock = async (): Promise<number> => get(`/v3/quorum/block/current`)

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/QuorumGetBlock" target="_blank">Tatum API documentation</a>
 */
export const getBlock = async (hash: string): Promise<QuorumBlock> => get(`/v3/quorum/block/${hash}`)

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/QuorumGetTransaction" target="_blank">Tatum API documentation</a>
 */
export const getTransaction = async (hash: string): Promise<QuorumTx> => get(`/v3/quorum/transaction/${hash}`)

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/QuorumGetTransactionReceipt" target="_blank">Tatum API documentation</a>
 */
export const getTransactionReceipt = async (hash: string): Promise<QuorumTxReceipt> => get(`/v3/quorum/transaction/${hash}/receipt`)

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/QuorumGenerateAccount" target="_blank">Tatum API documentation</a>
 */
export const createAccount = async (body: AccountPassword): Promise<{ success: boolean }> =>
  post(`/v3/quorum/account`, body, AccountPassword)

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/QuorumUnlockAccount" target="_blank">Tatum API documentation</a>
 */
export const unlockAccount = async (address: string, body: AccountPassword): Promise<{ success: boolean }> =>
  post(`/v3/quorum/account/${address}/unlock`, body, AccountPassword)
