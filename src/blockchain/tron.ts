import { get, post } from '../connector/tatum'
import { TransactionHash, TronAccount, TronBlock, TronTransaction, TronTrc10 } from '../model'

/**
 * For more details, see <a href="https://apidoc.tatum.io/#operation/TronBroadcast" target="_blank">Tatum API documentation</a>
 */
export const tronBroadcast = async (txData: string, signatureId?: string): Promise<TransactionHash> =>
  post(`/v3/tron/broadcast`, { txData, signatureId })

/**
 * For more details, see <a href="https://apidoc.tatum.io/#operation/TronGetCurrentBlock" target="_blank">Tatum API documentation</a>
 */
export const tronGetCurrentBlock = async (): Promise<{ testnet: boolean, hash: string, blockNumber: number }> => get(`/v3/tron/info`)

/**
 * For more details, see <a href="https://apidoc.tatum.io/#operation/TronGetBlock" target="_blank">Tatum API documentation</a>
 */
export const tronGetBlock = async (hash: string): Promise<TronBlock> => get(`/v3/tron/block/${hash}`)

/**
 * For more details, see <a href="https://apidoc.tatum.io/#operation/TronTrc10Detail" target="_blank">Tatum API documentation</a>
 */
export const tronGetTrc10Detail = async (id: string): Promise<TronTrc10> => get(`/v3/tron/trc10/detail/${id}`)

/**
 * For more details, see <a href="https://apidoc.tatum.io/#operation/TronGetTransaction" target="_blank">Tatum API documentation</a>
 */
export const tronGetTransaction = async (hash: string): Promise<TronTransaction> => get(`/v3/tron/transaction/${hash}`)

/**
 * For more details, see <a href="https://apidoc.tatum.io/#operation/TronGetAccount" target="_blank">Tatum API documentation</a>
 */
export const tronGetAccount = async (address: string): Promise<TronAccount> => get(`/v3/tron/account/${address}`)
