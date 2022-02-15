import BigNumber from 'bignumber.js'
import { get, post } from '../connector/tatum'
import { EstimateGasEth, EthBlock, EthEstimateGas, EthTx, TransactionHash } from '../model'

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/KlayBroadcast" target="_blank">Tatum API documentation</a>
 */
export const klaytnBroadcast = async (txData: string, signatureId?: string): Promise<TransactionHash> =>
  post(`/v3/klay/broadcast`, { txData, signatureId })

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/KlayGetTransactionCount" target="_blank">Tatum API documentation</a>
 */
export const klaytnGetTransactionsCount = async (address: string): Promise<number> => get(`/v3/klay/transaction/count/${address}`)

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/KlayGetCurrentBlock" target="_blank">Tatum API documentation</a>
 */
export const klaytnGetCurrentBlock = async (): Promise<number> => get(`/v3/klay/block/current`)

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/KlayGetBlock" target="_blank">Tatum API documentation</a>
 */
export const klaytnGetBlock = async (hash: string): Promise<EthBlock> => get(`/v3/klay/block/${hash}`)

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/KlayGetBalance" target="_blank">Tatum API documentation</a>
 */
export const klaytnGetAccountBalance = async (address: string): Promise<BigNumber> => get(`/v3/klay/account/balance/${address}`)

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/KlayGetTransaction" target="_blank">Tatum API documentation</a>
 */
export const klaytnGetTransaction = async (hash: string): Promise<EthTx> => get(`/v3/klay/transaction/${hash}`)

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/KlayEstimateGas" target="_blank">Tatum API documentation</a>
 */
export const klaytnEstimateGas = (body: EstimateGasEth): Promise<EthEstimateGas> => post('/v3/klay/gas', body, EstimateGasEth)
