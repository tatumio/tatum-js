import { get, post, EthBlock, EthTx, EthEstimateGas, EstimateGas, TransactionHash } from '@tatumio/tatum-core'
import BigNumber from 'bignumber.js'

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/KccBroadcast" target="_blank">Tatum API documentation</a>
 */
export const broadcast = async (txData: string, signatureId?: string): Promise<TransactionHash> =>
  post(`/v3/kcc/broadcast`, { txData, signatureId })

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/KccGetTransactionCount" target="_blank">Tatum API documentation</a>
 */
export const getTransactionsCount = async (address: string): Promise<number> => get(`/v3/kcc/transaction/count/${address}`)

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/KccGetCurrentBlock" target="_blank">Tatum API documentation</a>
 */
export const getCurrentBlock = async (): Promise<number> => get(`/v3/kcc/block/current`)

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/KccGetBlock" target="_blank">Tatum API documentation</a>
 */
export const getBlock = async (hash: string): Promise<EthBlock> => get(`/v3/kcc/block/${hash}`)

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/KccGetBalance" target="_blank">Tatum API documentation</a>
 */
export const getAccountBalance = async (address: string): Promise<BigNumber> => get(`/v3/kcc/account/balance/${address}`)

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/KccGetTransaction" target="_blank">Tatum API documentation</a>
 */
export const getTransaction = async (hash: string): Promise<EthTx> => get(`/v3/kcc/transaction/${hash}`)

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/KccEstimateGas" target="_blank">Tatum API documentation</a>
 */
export const estimateGas = (body: EstimateGas): Promise<EthEstimateGas> => post('/v3/kcc/gas', body, EstimateGas)
