import BigNumber from 'bignumber.js'
import { get, post, TransactionHash } from '@tatumio/tatum-core'
import { AlgoBlock, AlgoTx } from '../model'

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/AlgorandBroadcast" target="_blank">Tatum API documentation</a>
 */
export const broadcast = async (txData: string, signatureId?: string): Promise<TransactionHash> =>
  post(`/v3/algorand/broadcast`, { txData, signatureId })

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/AlgorandGetTransactionCount" target="_blank">Tatum API documentation</a>
 */
export const getTransactionsCount = async (address: string): Promise<number> => get(`/v3/algorand/transaction/count/${address}`)

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/AlgorandGetCurrentBlock" target="_blank">Tatum API documentation</a>
 */
export const getCurrentBlock = async (): Promise<number> => get(`/v3/algorand/block/current`)

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/AlgorandGetBlock" target="_blank">Tatum API documentation</a>
 */
export const getBlock = async (roundNumber: string): Promise<AlgoBlock> => get(`/v3/algorand/block/${roundNumber}`)

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/AlgorandGetBalance" target="_blank">Tatum API documentation</a>
 */
export const getAccountBalance = async (address: string): Promise<BigNumber> => get(`/v3/algorand/account/balance/${address}`)

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/AlgorandGetTransaction" target="_blank">Tatum API documentation</a>
 */
export const getTransaction = async (txid: string): Promise<AlgoTx> => get(`/v3/algorand/transaction/${txid}`)
