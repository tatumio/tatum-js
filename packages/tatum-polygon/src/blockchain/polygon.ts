import { get, post, EthBlock, EthTx, EthEstimateGas, EstimateGas, TransactionHash } from '@tatumio/tatum-core'
import BigNumber from 'bignumber.js'

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/PolygonBroadcast" target="_blank">Tatum API documentation</a>
 */
export const broadcast = async (txData: string, signatureId?: string): Promise<TransactionHash> =>
  post(`/v3/polygon/broadcast`, { txData, signatureId })

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/PolygonGetTransactionCount" target="_blank">Tatum API documentation</a>
 */
export const getTransactionsCount = async (address: string): Promise<number> => get(`/v3/polygon/transaction/count/${address}`)

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/PolygonGetCurrentBlock" target="_blank">Tatum API documentation</a>
 */
export const getCurrentBlock = async (): Promise<number> => get(`/v3/polygon/block/current`)

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/PolygonGetBlock" target="_blank">Tatum API documentation</a>
 */
export const getBlock = async (hash: string): Promise<EthBlock> => get(`/v3/polygon/block/${hash}`)

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/PolygonGetBalance" target="_blank">Tatum API documentation</a>
 */
export const getAccountBalance = async (address: string): Promise<BigNumber> => get(`/v3/polygon/account/balance/${address}`)

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/PolygonGetTransaction" target="_blank">Tatum API documentation</a>
 */
export const getTransaction = async (hash: string): Promise<EthTx> => get(`/v3/polygon/transaction/${hash}`)

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/PolygonEstimateGas" target="_blank">Tatum API documentation</a>
 */
export const estimateGas = (body: EstimateGas): Promise<EthEstimateGas> => post('/v3/polygon/gas', body, EstimateGas)
