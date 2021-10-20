import BigNumber from 'bignumber.js'
import {get, post} from '@tatumio/tatum-core'
import {AlgoBlock, AlgoTx, TransactionHash} from '../model'

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/AlgorandBroadcast" target="_blank">Tatum API documentation</a>
 */
export const algorandBroadcast = async (txData: string, signatureId?: string): Promise<TransactionHash> =>
    post(`/v3/algorand/broadcast`, {txData, signatureId})

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/AlgorandGetTransactionCount" target="_blank">Tatum API documentation</a>
 */
export const algorandGetTransactionsCount = async (address: string): Promise<number> => 
    get(`/v3/algorand/transaction/count/${address}`)

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/AlgorandGetCurrentBlock" target="_blank">Tatum API documentation</a>
 */
export const algorandGetCurrentBlock = async (): Promise<number> => 
    get(`/v3/algorand/block/current`)

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/AlgorandGetBlock" target="_blank">Tatum API documentation</a>
 */
export const algorandGetBlock = async (roundNumber: string): Promise<AlgoBlock> => 
    get(`/v3/algorand/block/${roundNumber}`)

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/AlgorandGetBalance" target="_blank">Tatum API documentation</a>
 */
export const algorandGetAccountBalance = async (address: string): Promise<BigNumber> => 
    get(`/v3/algorand/account/balance/${address}`)

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/AlgorandGetTransaction" target="_blank">Tatum API documentation</a>
 */
 export const algorandGetTransaction = async (txid: string): Promise<AlgoTx> => get(`/v3/algorand/transaction/${txid}`)
