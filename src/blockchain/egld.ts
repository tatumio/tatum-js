import BigNumber from 'bignumber.js'
import {get, post} from '../connector/tatum'
import {EgldSendTransaction, EgldBlock, EgldTransaction, TransactionHash} from '../model'

/**
 * For more details, see <a href="https://apidoc.tatum.io/#operation/EgldBroadcast" target="_blank">Tatum API documentation</a>
 */
export const egldBroadcast = async (txData: string, signatureId?: string): Promise<TransactionHash> =>
    post(`/v3/egld/broadcast`, {txData, signatureId})

/**
 * For more details, see <a href="https://apidoc.tatum.io/#operation/EgldGetTransactionCount" target="_blank">Tatum API documentation</a>
 */
export const egldGetTransactionsCount = async (address: string): Promise<number> => get(`/v3/egld/transaction/count/${address}`)

/**
 * For more details, see <a href="https://apidoc.tatum.io/#operation/EgldGetCurrentBlock" target="_blank">Tatum API documentation</a>
 */
export const egldGetCurrentBlock = async (): Promise<number> => get(`/v3/egld/block/current`)

/**
 * For more details, see <a href="https://apidoc.tatum.io/#operation/EgldGetBlock" target="_blank">Tatum API documentation</a>
 */
export const egldGetBlock = async (hash: string): Promise<EgldBlock> => get(`/v3/egld/block/${hash}`)

/**
 * For more details, see <a href="https://apidoc.tatum.io/#operation/EgldGetBalance" target="_blank">Tatum API documentation</a>
 */
export const egldGetAccountBalance = async (address: string): Promise<BigNumber> => get(`/v3/egld/account/balance/${address}`)

/**
 * For more details, see <a href="https://apidoc.tatum.io/" target="_blank">Tatum API documentation</a>
 */
export const egldGetAccountErc20Balance = async (address: string, tokenId: string): Promise<number> =>
    get(`/v3/egld/account/esdt/balance/${address}/${tokenId}`)

/**
 * For more details, see <a href="https://apidoc.tatum.io/#operation/EgldGetTransaction" target="_blank">Tatum API documentation</a>
 */
export const egldGetTransaction = async (hash: string): Promise<EgldTransaction> => get(`/v3/egld/transaction/${hash}`)

/**
 * For more details, see <a href="https://apidoc.tatum.io/#operation/EgldEstimateGas" target="_blank">Tatum API documentation</a>
 */
export const egldEstimateGas = (body: EgldSendTransaction): Promise<number> => post('/v3/egld/gas', body, EgldSendTransaction)
