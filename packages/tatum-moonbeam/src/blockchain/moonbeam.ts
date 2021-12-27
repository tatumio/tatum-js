import { get, post, EthBlock, EthTx, EthEstimateGas, EstimateGas, TransactionHash } from '@tatumio/tatum-core'
import BigNumber from 'bignumber.js'

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/MoonbeamBroadcast" target="_blank">Tatum API documentation</a>
 */
export const broadcast = async (txData: string, signatureId?: string): Promise<TransactionHash> =>
  post(`/v3/moonbeam/broadcast`, { txData, signatureId })

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/MoonbeamGetTransactionCount" target="_blank">Tatum API documentation</a>
 */
export const getTransactionsCount = async (address: string): Promise<number> => get(`/v3/moonbeam/transaction/count/${address}`)

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/MoonbeamGetCurrentBlock" target="_blank">Tatum API documentation</a>
 */
export const getCurrentBlock = async (): Promise<number> => get(`/v3/moonbeam/block/current`)

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/MoonbeamGetBlock" target="_blank">Tatum API documentation</a>
 */
export const getBlock = async (hash: string): Promise<EthBlock> => get(`/v3/moonbeam/block/${hash}`)

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/MoonbeamGetBalance" target="_blank">Tatum API documentation</a>
 */
export const getBlockchainAccountBalance = async (address: string): Promise<BigNumber> => get(`/v3/moonbeam/account/balance/${address}`)

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/MoonbeamGetTransaction" target="_blank">Tatum API documentation</a>
 */
export const getTransaction = async (hash: string): Promise<EthTx> => get(`/v3/moonbeam/transaction/${hash}`)

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/MoonbeamEstimateGas" target="_blank">Tatum API documentation</a>
 */
export const estimateGas = (body: EstimateGas): Promise<EthEstimateGas> => post('/v3/moonbeam/gas', body, EstimateGas)
