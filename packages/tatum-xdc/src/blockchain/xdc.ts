import BigNumber from 'bignumber.js'
import {get, post, EstimateGas, EthBlock, EthEstimateGas, EthTx, TransactionHash} from '@tatumio/tatum-core'

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/XdcBroadcast" target="_blank">Tatum API documentation</a>
 */
export const xdcBroadcast = async (txData: string, signatureId?: string): Promise<TransactionHash> =>
    post(`/v3/xdc/broadcast`, {txData, signatureId})

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/XdcGetTransactionCount" target="_blank">Tatum API documentation</a>
 */
export const xdcGetTransactionsCount = async (address: string): Promise<number> => get(`/v3/xdc/transaction/count/${address}`)

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/XdcGetCurrentBlock" target="_blank">Tatum API documentation</a>
 */
export const xdcGetCurrentBlock = async (): Promise<number> => get(`/v3/xdc/block/current`)

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/XdcGetBlock" target="_blank">Tatum API documentation</a>
 */
export const xdcGetBlock = async (hash: string): Promise<EthBlock> => get(`/v3/xdc/block/${hash}`)

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/XdcGetBalance" target="_blank">Tatum API documentation</a>
 */
export const xdcGetAccountBalance = async (address: string): Promise<BigNumber> => get(`/v3/xdc/account/balance/${address}`)

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/XdcErc20GetBalance" target="_blank">Tatum API documentation</a>
 */
export const xdcGetAccountErc20Balance = async (address: string, contractAddress: string): Promise<number> =>
    get(`/v3/xdc/account/balance/erc20/${address}?contractAddress=${contractAddress}`)

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/XdcGetTransaction" target="_blank">Tatum API documentation</a>
 */
export const xdcGetTransaction = async (hash: string): Promise<EthTx> => get(`/v3/xdc/transaction/${hash}`)

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/XdcEstimateGas" target="_blank">Tatum API documentation</a>
 */
export const xdcEstimateGas = (body: EstimateGas): Promise<EthEstimateGas> => post('/v3/xdc/gas', body, EstimateGas)
