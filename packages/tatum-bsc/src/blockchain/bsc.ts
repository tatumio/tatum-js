import { TransactionHash, get, post, EthBlock, EthTx, EthEstimateGas, EstimateGas } from '@tatumio/tatum-core'
import BigNumber from 'bignumber.js'

/**
 * Broadcasts signed transaction to the Bsc blockchain. <br>
 * For more details, see <a href="https://tatum.io/apidoc#operation/BscBroadcast" target="_blank">Tatum API documentation</a>
 */
export const broadcast = async (txData: string, signatureId?: string): Promise<TransactionHash> =>
  post(`/v3/bsc/broadcast`, { txData, signatureId })

/**
 * Returns a number of outgoing BSC transactions for the address from Bsc blockchain. <br>
 * When a transaction is sent, there can be multiple outgoing transactions, which are not yet processed by the blockchain.
 * To distinguish between them, there is a counter called a nonce, which represents the order of the transaction in the list of outgoing transactions. <br>
 * For more details, see <a href="https://tatum.io/apidoc#operation/BscGetTransactionCount" target="_blank">Tatum API documentation</a>
 */
export const getTransactionsCount = async (address: string): Promise<number> => get(`/v3/bsc/transaction/count/${address}`)

/**
 * Returns information about Bsc blockchain. <br>
 * For more details, see <a href="https://tatum.io/apidoc#operation/BscGetCurrentBlock" target="_blank">Tatum API documentation</a>
 */
export const getCurrentBlock = async (): Promise<number> => get(`/v3/bsc/block/current`)

/**
 * Returns block by its hash from Bsc blockchain. <br>
 * For more details, see <a href="https://tatum.io/apidoc#operation/BscGetBlock" target="_blank">Tatum API documentation</a>
 */
export const getBlock = async (hash: string): Promise<EthBlock> => get(`/v3/bsc/block/${hash}`)

/**
 * Returns balance on address from Bsc blockchain. <br>
 * For more details, see <a href="https://tatum.io/apidoc#operation/BscGetBalance" target="_blank">Tatum API documentation</a>
 */
export const getBlockchainAccountBalance = async (address: string): Promise<BigNumber> => get(`/v3/bsc/account/balance/${address}`)

/**
 * TODO: This endpoint dont exists? @SamuelSramko
 * For more details, see <a href="https://tatum.io/apidoc#operation/BscBep20GetBalance" target="_blank">Tatum API documentation</a>
 */
export const getAccountBep20Address = async (address: string, contractAddress: string): Promise<number> =>
  get(`/v3/bsc/account/balance/bep20/${address}?contractAddress=${contractAddress}`)

/**
 * Returns transaction by hash from Bsc blockchain. <br>
 * For more details, see <a href="https://tatum.io/apidoc#operation/BscGetTransaction" target="_blank">Tatum API documentation</a>
 */
export const getTransaction = async (hash: string): Promise<EthTx> => get(`/v3/bsc/transaction/${hash}`)

/**
 * Returns gasLimit and gasPrice estimation of the transaction from Bsc blockchain. <br>
 * Gas price is obtained from https://explorer.bitquery.io/bsc/gas. <br>
 * For more details, see <a href="https://tatum.io/apidoc#operation/BscEstimateGas" target="_blank">Tatum API documentation</a>
 */
export const estimateGas = (body: EstimateGas): Promise<EthEstimateGas> => post('/v3/bsc/gas', body, EstimateGas)
