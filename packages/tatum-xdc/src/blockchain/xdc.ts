import BigNumber from 'bignumber.js'
import { get, post, EstimateGas, EthBlock, EthEstimateGas, EthTx, TransactionHash } from '@tatumio/tatum-core'

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/XdcBroadcast" target="_blank">Tatum API documentation</a>
 */
export const broadcast = async (txData: string, signatureId?: string): Promise<TransactionHash> =>
  post(`/v3/xdc/broadcast`, { txData, signatureId })

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/XdcGetTransactionCount" target="_blank">Tatum API documentation</a>
 */
export const getTransactionsCount = async (address: string): Promise<number> => get(`/v3/xdc/transaction/count/${address}`)

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/XdcGetCurrentBlock" target="_blank">Tatum API documentation</a>
 */
export const getCurrentBlock = async (): Promise<number> => get(`/v3/xdc/block/current`)

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/XdcGetBlock" target="_blank">Tatum API documentation</a>
 */
export const getBlock = async (hash: string): Promise<EthBlock> => get(`/v3/xdc/block/${hash}`)

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/XdcGetBalance" target="_blank">Tatum API documentation</a>
 */
export const getBlockchainAccountBalance = async (address: string): Promise<BigNumber> => get(`/v3/xdc/account/balance/${address}`)

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/XdcErc20GetBalance" target="_blank">Tatum API documentation</a>
 */
export const getAccountErc20Balance = async (address: string, contractAddress: string): Promise<number> =>
  get(`/v3/xdc/account/balance/erc20/${address}?contractAddress=${contractAddress}`)

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/XdcGetTransaction" target="_blank">Tatum API documentation</a>
 */
export const getTransaction = async (hash: string): Promise<EthTx> => get(`/v3/xdc/transaction/${hash}`)

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/XdcEstimateGas" target="_blank">Tatum API documentation</a>
 */
export const estimateGas = (body: EstimateGas): Promise<EthEstimateGas> => post('/v3/xdc/gas', body, EstimateGas)
