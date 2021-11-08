import { get, post, EthBlock, EthTx, EthEstimateGas, EstimateGas, TransactionHash } from '@tatumio/tatum-core'
import BigNumber from 'bignumber.js'

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/KccBroadcast" target="_blank">Tatum API documentation</a>
 */
export const kccBroadcast = async (txData: string, signatureId?: string): Promise<TransactionHash> =>
  post(`/v3/kcc/broadcast`, { txData, signatureId })

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/KccGetTransactionCount" target="_blank">Tatum API documentation</a>
 */
export const kccGetTransactionsCount = async (address: string): Promise<number> => get(`/v3/kcc/transaction/count/${address}`)

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/KccGetCurrentBlock" target="_blank">Tatum API documentation</a>
 */
export const kccGetCurrentBlock = async (): Promise<number> => get(`/v3/kcc/block/current`)

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/KccGetBlock" target="_blank">Tatum API documentation</a>
 */
export const kccGetBlock = async (hash: string): Promise<EthBlock> => get(`/v3/kcc/block/${hash}`)

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/KccGetBalance" target="_blank">Tatum API documentation</a>
 */
export const kccGetAccountBalance = async (address: string): Promise<BigNumber> => get(`/v3/kcc/account/balance/${address}`)

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/KccGetTransaction" target="_blank">Tatum API documentation</a>
 */
export const kccGetTransaction = async (hash: string): Promise<EthTx> => get(`/v3/kcc/transaction/${hash}`)

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/KccEstimateGas" target="_blank">Tatum API documentation</a>
 */
export const kccEstimateGas = (body: EstimateGas): Promise<EthEstimateGas> => post('/v3/kcc/gas', body, EstimateGas)
