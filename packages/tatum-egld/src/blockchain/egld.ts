import BigNumber from 'bignumber.js'
import { get, post, TransactionHash } from '@tatumio/tatum-core'
import { EgldSendTransaction, EgldBlock, EgldTransaction } from '../model'

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/EgldBroadcast" target="_blank">Tatum API documentation</a>
 */
export const broadcast = async (txData: string, signatureId?: string): Promise<TransactionHash> =>
  post(`/v3/egld/broadcast`, { txData, signatureId })

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/EgldGetTransactionCount" target="_blank">Tatum API documentation</a>
 */
export const getTransactionsCount = async (address: string): Promise<number> => get(`/v3/egld/transaction/count/${address}`)

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/EgldGetCurrentBlock" target="_blank">Tatum API documentation</a>
 */
export const getCurrentBlock = async (): Promise<number> => get(`/v3/egld/block/current`)

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/EgldGetBlock" target="_blank">Tatum API documentation</a>
 */
export const getBlock = async (hash: string): Promise<EgldBlock> => get(`/v3/egld/block/${hash}`)

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/EgldGetBalance" target="_blank">Tatum API documentation</a>
 */
export const getBlockchainAccountBalance = async (address: string): Promise<BigNumber> => get(`/v3/egld/account/balance/${address}`)

/**
 * For more details, see <a href="https://tatum.io/apidoc" target="_blank">Tatum API documentation</a>
 */
export const getAccountErc20Balance = async (address: string, tokenId: string): Promise<number> =>
  get(`/v3/egld/account/esdt/balance/${address}/${tokenId}`)

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/EgldGetTransaction" target="_blank">Tatum API documentation</a>
 */
export const getTransaction = async (hash: string): Promise<EgldTransaction> => get(`/v3/egld/transaction/${hash}`)

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/EgldEstimateGas" target="_blank">Tatum API documentation</a>
 */
export const estimateGas = (body: EgldSendTransaction): Promise<number> => post('/v3/egld/gas', body, EgldSendTransaction)
