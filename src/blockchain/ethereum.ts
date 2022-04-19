import BigNumber from 'bignumber.js'
import { get, post } from '../connector/tatum'
import { EstimateGasEth, EthBlock, EthEstimateGas, EthTx, TransactionHash } from '../model'

/**
 * For more details, see <a href="https://apidoc.tatum.io/#operation/EthBroadcast" target="_blank">Tatum API documentation</a>
 */
export const ethBroadcast = async (txData: string, signatureId?: string): Promise<TransactionHash> =>
  post(`/v3/ethereum/broadcast`, { txData, signatureId })

/**
 * For more details, see <a href="https://apidoc.tatum.io/#operation/EthGetTransactionCount" target="_blank">Tatum API documentation</a>
 */
export const ethGetTransactionsCount = async (address: string): Promise<number> => get(`/v3/ethereum/transaction/count/${address}`)

/**
 * For more details, see <a href="https://apidoc.tatum.io/#operation/EthGetCurrentBlock" target="_blank">Tatum API documentation</a>
 */
export const ethGetCurrentBlock = async (): Promise<number> => get(`/v3/ethereum/block/current`)

/**
 * For more details, see <a href="https://apidoc.tatum.io/#operation/EthGetBlock" target="_blank">Tatum API documentation</a>
 */
export const ethGetBlock = async (hash: string): Promise<EthBlock> => get(`/v3/ethereum/block/${hash}`)

/**
 * For more details, see <a href="https://apidoc.tatum.io/#operation/EthGetBalance" target="_blank">Tatum API documentation</a>
 */
export const ethGetAccountBalance = async (address: string): Promise<BigNumber> => get(`/v3/ethereum/account/balance/${address}`)

/**
 * For more details, see <a href="https://apidoc.tatum.io/#operation/EthErc20GetBalance" target="_blank">Tatum API documentation</a>
 */
export const ethGetAccountErc20Address = async (address: string, contractAddress: string): Promise<{ balance: number }> =>
  get(`/v3/ethereum/account/balance/erc20/${address}?contractAddress=${contractAddress}`)

/**
 * For more details, see <a href="https://apidoc.tatum.io/#operation/EthGetTransaction" target="_blank">Tatum API documentation</a>
 */
export const ethGetTransaction = async (hash: string): Promise<EthTx> => get(`/v3/ethereum/transaction/${hash}`)

/**
 * For more details, see <a href="https://apidoc.tatum.io/#operation/EthGetTransactionByAddress" target="_blank">Tatum API documentation</a>
 */
export const ethGetAccountTransactions = async (address: string, pageSize = 50, offset = 0): Promise<EthTx[]> =>
  get(`/v3/ethereum/account/transaction/${address}?pageSize=${pageSize}&offset=${offset}`)

/**
 * For more details, see <a href="https://apidoc.tatum.io/#operation/EthEstimateGas" target="_blank">Tatum API documentation</a>
 */
export const ethEstimateGas = (body: EstimateGasEth): Promise<EthEstimateGas> => post('/v3/ethereum/gas', body, EstimateGasEth)