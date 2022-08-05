import BigNumber from 'bignumber.js'
import {get, post} from '../connector/tatum'
import {EstimateGasEth, EthBlock, EthEstimateGas, EthTx, TransactionHash} from '../model'

/**
 * Broadcasts signed transaction to the Bsc blockchain. <br>
 * For more details, see <a href="https://apidoc.tatum.io/#operation/BscBroadcast" target="_blank">Tatum API documentation</a>
 */
export const bscBroadcast = async (txData: string, signatureId?: string): Promise<TransactionHash> =>
    post(`/v3/bsc/broadcast`, {txData, signatureId})

/**
 * Returns a number of outgoing BSC transactions for the address from Bsc blockchain. <br>
 * When a transaction is sent, there can be multiple outgoing transactions, which are not yet processed by the blockchain.
 * To distinguish between them, there is a counter called a nonce, which represents the order of the transaction in the list of outgoing transactions. <br>
 * For more details, see <a href="https://apidoc.tatum.io/#operation/BscGetTransactionCount" target="_blank">Tatum API documentation</a>
 */
export const bscGetTransactionsCount = async (address: string): Promise<number> => get(`/v3/bsc/transaction/count/${address}`)

/**
 * Returns information about Bsc blockchain. <br>
 * For more details, see <a href="https://apidoc.tatum.io/#operation/BscGetCurrentBlock" target="_blank">Tatum API documentation</a>
 */
export const bscGetCurrentBlock = async (): Promise<number> => get(`/v3/bsc/block/current`)

/**
 * Returns block by its hash from Bsc blockchain. <br>
 * For more details, see <a href="https://apidoc.tatum.io/#operation/BscGetBlock" target="_blank">Tatum API documentation</a>
 */
export const bscGetBlock = async (hash: string): Promise<EthBlock> => get(`/v3/bsc/block/${hash}`)

/**
 * Returns balance on address from Bsc blockchain. <br>
 * For more details, see <a href="https://apidoc.tatum.io/#operation/BscGetBalance" target="_blank">Tatum API documentation</a>
 */
export const bscGetAccountBalance = async (address: string): Promise<BigNumber> => get(`/v3/bsc/account/balance/${address}`)

/**
 * TODO: This endpoint dont exists? @SamuelSramko
 * For more details, see <a href="https://apidoc.tatum.io/#operation/BscBep20GetBalance" target="_blank">Tatum API documentation</a>
 */
export const bscGetAccountBep20Address = async (address: string, contractAddress: string): Promise<number> =>
    get(`/v3/bsc/account/balance/bep20/${address}?contractAddress=${contractAddress}`)

/**
 * Returns transaction by hash from Bsc blockchain. <br>
 * For more details, see <a href="https://apidoc.tatum.io/#operation/BscGetTransaction" target="_blank">Tatum API documentation</a>
 */
export const bscGetTransaction = async (hash: string): Promise<EthTx> => get(`/v3/bsc/transaction/${hash}`)

/**
 * Returns gasLimit and gasPrice estimation of the transaction from Bsc blockchain. <br>
 * Gas price is obtained from https://explorer.bitquery.io/bsc/gas. <br>
 * For more details, see <a href="https://apidoc.tatum.io/#operation/BscEstimateGas" target="_blank">Tatum API documentation</a>
 */
export const bscEstimateGas = (body: EstimateGasEth): Promise<EthEstimateGas> => post('/v3/bsc/gas', body, EstimateGasEth)
