import { get, post, EthBlock, EthTx, EthEstimateGas, EstimateGas, TransactionHash } from '@tatumio/tatum-core'
import BigNumber from 'bignumber.js'

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/KcsBroadcast" target="_blank">Tatum API documentation</a>
 */
export const kcsBroadcast = async (txData: string, signatureId?: string): Promise<TransactionHash> =>
  post(`/v3/kcs/broadcast`, { txData, signatureId })

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/KcsGetTransactionCount" target="_blank">Tatum API documentation</a>
 */
export const kcsGetTransactionsCount = async (address: string): Promise<number> => get(`/v3/kcs/transaction/count/${address}`)

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/KcsGetCurrentBlock" target="_blank">Tatum API documentation</a>
 */
export const kcsGetCurrentBlock = async (): Promise<number> => get(`/v3/kcs/block/current`)

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/KcsGetBlock" target="_blank">Tatum API documentation</a>
 */
export const kcsGetBlock = async (hash: string): Promise<EthBlock> => get(`/v3/kcs/block/${hash}`)

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/KcsGetBalance" target="_blank">Tatum API documentation</a>
 */
export const kcsGetAccountBalance = async (address: string): Promise<BigNumber> => get(`/v3/kcs/account/balance/${address}`)

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/KcsGetTransaction" target="_blank">Tatum API documentation</a>
 */
export const kcsGetTransaction = async (hash: string): Promise<EthTx> => get(`/v3/kcs/transaction/${hash}`)

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/KcsEstimateGas" target="_blank">Tatum API documentation</a>
 */
export const kcsEstimateGas = (body: EstimateGas): Promise<EthEstimateGas> => post('/v3/kcs/gas', body, EstimateGas)
