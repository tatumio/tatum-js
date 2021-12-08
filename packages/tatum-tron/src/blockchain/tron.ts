import { get, post, TransactionHash } from '@tatumio/tatum-core'
import { TronAccount, TronBlock, TronTransaction, TronTrc10 } from '../model'

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/TronBroadcast" target="_blank">Tatum API documentation</a>
 */
export const broadcast = async (txData: string, signatureId?: string): Promise<TransactionHash> =>
  post(`/v3/tron/broadcast`, { txData, signatureId })

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/TronGetCurrentBlock" target="_blank">Tatum API documentation</a>
 */
export const getCurrentBlock = async (): Promise<{ testnet: boolean; hash: string; blockNumber: number }> => get(`/v3/tron/info`)

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/TronGetBlock" target="_blank">Tatum API documentation</a>
 */
export const getBlock = async (hash: string): Promise<TronBlock> => get(`/v3/tron/block/${hash}`)

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/TronTrc10Detail" target="_blank">Tatum API documentation</a>
 */
export const getTrc10Detail = async (id: string): Promise<TronTrc10> => get(`/v3/tron/trc10/detail/${id}`)

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/TronGetTransaction" target="_blank">Tatum API documentation</a>
 */
export const getTransaction = async (hash: string): Promise<TronTransaction> => get(`/v3/tron/transaction/${hash}`)

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/TronGetAccount" target="_blank">Tatum API documentation</a>
 */
export const getAccount = async (address: string): Promise<TronAccount> => get(`/v3/tron/account/${address}`)
