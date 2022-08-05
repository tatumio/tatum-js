import { get, post } from '../connector/tatum'
import {BlockHash, BtcBlock, BtcInfo, BtcTx, BtcUTXO, TransactionHash} from '../model'

/**
 * Broadcasts signed transaction to the Btc blockchain. <br>
 * For more details, see <a href="https://apidoc.tatum.io/#operation/BtcBroadcast" target="_blank">Tatum API documentation</a>
 */
export const btcBroadcast = async (txData: string, signatureId?: string): Promise<TransactionHash> =>
  post(`/v3/bitcoin/broadcast`, { txData, signatureId })

/**
 * Returns information about Btc blockchain. <br>
 * For more details, see <a href="https://apidoc.tatum.io/#operation/BtcGetBlockChainInfo" target="_blank">Tatum API documentation</a>
 */
export const btcGetCurrentBlock = async (): Promise<BtcInfo> => get('/v3/bitcoin/info')

/**
 * Returns balance on address from Btc blockchain. <br>
 * For more details, see <a href="https://apidoc.tatum.io/#operation/BtcGetBalanceOfAddress" target="_blank">Tatum API documentation</a>
 */
export const btcGetBalance = async (address: string): Promise<{ incoming: string, outgoing: string }> => get(`/v3/bitcoin/address/balance/${address}`)

/**
 * Returns block by its hash from Btc blockchain. <br>
 * For more details, see <a href="https://apidoc.tatum.io/#operation/BtcGetBlock" target="_blank">Tatum API documentation</a>
 */
export const btcGetBlock = async (hash: string): Promise<BtcBlock> => get(`/v3/bitcoin/block/${hash}`)

/**
 * Returns block hash by index from Btc blockchain. <br>
 * For more details, see <a href="https://apidoc.tatum.io/#operation/BtcGetBlockHash" target="_blank">Tatum API documentation</a>
 */
export const btcGetBlockHash = async (i: number): Promise<BlockHash> => get(`/v3/bitcoin/block/hash/${i}`)

/**
 * Returns the UTXO of given transaction and output index from Btc blockchain. <br>
 *
 * UTXO means Unspent Transaction Output, which in blockchain terminology means assets that a user has received at a specific address and has not yet spent.
 * In bitcoin-like blockchains (BTC, LTC, DOGE, BCH), every transaction is built from a list of previously unspent transactions connected to the address.
 * If a user owns address A, and receives 10 BTC in transaction T1, they can spend a UTXO T1 with a total value of 10 BTC in the next transaction.
 * The user can spend multiple UTXOs from different addresses in one transaction.
 *
 * @param hash Transaction hash.
 * @param i Index of tx output to check if it has been spent or not.
 * For more details, see <a href="https://apidoc.tatum.io/#operation/BtcGetUTXO" target="_blank">Tatum API documentation</a>
 */
export const btcGetUTXO = async (hash: string, i: number): Promise<BtcUTXO> => get(`/v3/bitcoin/utxo/${hash}/${i}`)

/**
 * Returns transactions by address from Btc blockchain. <br>
 *
 * @param address For which address will be transactions returned.
 * @param pageSize How many transactions will be returned. Max number of transactions per page is 50.
 * @param offset Offset to obtain the next page of data.
 *
 * For more details, see <a href="https://apidoc.tatum.io/#operation/BtcGetTxByAddress" target="_blank">Tatum API documentation</a>
 */
export const btcGetTxForAccount = async (address: string, pageSize = 50, offset = 0): Promise<BtcTx[]> =>
  get(`/v3/bitcoin/transaction/address/${address}?pageSize=${pageSize}&offset=${offset}`)

/**
 * Returns transaction by hash from Btc blockchain. <br>
 * For more details, see <a href="https://apidoc.tatum.io/#operation/BtcGetRawTransaction" target="_blank">Tatum API documentation</a>
 */
export const btcGetTransaction = async (hash: string): Promise<BtcTx> => get(`/v3/bitcoin/transaction/${hash}`)
