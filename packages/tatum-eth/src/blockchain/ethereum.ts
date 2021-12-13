import BigNumber from 'bignumber.js'
import { get, post, TransactionHash, EstimateGas, EthBlock, EthEstimateGas } from '@tatumio/tatum-core'
import { ETHTx } from '../model'

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/EthBroadcast" target="_blank">Tatum API documentation</a>
 */
export const broadcast = async (txData: string, signatureId?: string): Promise<TransactionHash> =>
  post(`/v3/ethereum/broadcast`, { txData, signatureId })

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/EthGetTransactionCount" target="_blank">Tatum API documentation</a>
 */
export const getTransactionsCount = async (address: string): Promise<number> => get(`/v3/ethereum/transaction/count/${address}`)

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/EthGetCurrentBlock" target="_blank">Tatum API documentation</a>
 */
export const getCurrentBlock = async (): Promise<number> => get(`/v3/ethereum/block/current`)

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/EthGetBlock" target="_blank">Tatum API documentation</a>
 */
export const getBlock = async (hash: string): Promise<EthBlock> => get(`/v3/ethereum/block/${hash}`)

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/EthGetBalance" target="_blank">Tatum API documentation</a>
 */
export const getBlockchainAccountBalance = async (address: string): Promise<BigNumber> => get(`/v3/ethereum/account/balance/${address}`)

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/EthErc20GetBalance" target="_blank">Tatum API documentation</a>
 */
export const getAccountErc20Address = async (address: string, contractAddress: string): Promise<{ balance: number }> =>
  get(`/v3/ethereum/account/balance/erc20/${address}?contractAddress=${contractAddress}`)

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/EthGetTransaction" target="_blank">Tatum API documentation</a>
 */
export const getTransaction = async (hash: string): Promise<ETHTx> => get(`/v3/ethereum/transaction/${hash}`)

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/EthGetTransactionByAddress" target="_blank">Tatum API documentation</a>
 */
export const getAccountTransactions = async (address: string, pageSize = 50, offset = 0): Promise<ETHTx[]> =>
  get(`/v3/ethereum/account/transaction/${address}?pageSize=${pageSize}&offset=${offset}`)

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/EthEstimateGas" target="_blank">Tatum API documentation</a>
 */
export const estimateGas = (body: EstimateGas): Promise<EthEstimateGas> => post('/v3/ethereum/gas', body, EstimateGas)
