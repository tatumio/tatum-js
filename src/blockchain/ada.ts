import {get, post} from '../connector/tatum'
import {AdaBlock, AdaBlockChainInfo, AdaTransaction, AdaUtxo, TransactionHash} from '../model'

/**
 * Broadcasts signed transaction to the Ada blockchain. <br>
 * For more details, see <a href="https://tatum.io/apidoc#operation/AdaBroadcast" target="_blank">Tatum API documentation</a>
 *
 * @param txData
 * @param signatureId
 */
export const adaBroadcast = async (txData: string, signatureId?: string): Promise<TransactionHash> =>
    post(`/v3/ada/broadcast`, {txData, signatureId})

/**
 * Returns information about Ada blockchain. <br>
 * For more details, see <a href="https://tatum.io/apidoc#operation/AdaGetBlockChainInfo" target="_blank">Tatum API documentation</a>
 */
export const adaGetBlockChainInfo = async (): Promise<AdaBlockChainInfo> => get(`/v3/ada/info`)

/**
 * Returns block by its hash from Ada blockchain. <br>
 * For more details, see <a href="https://tatum.io/apidoc#operation/AdaGetBlock" target="_blank">Tatum API documentation</a>
 */
export const adaGetBlock = async (hash: string): Promise<AdaBlock> => get(`/v3/ada/block/${hash}`)

/**
 * Returns transaction by hash from Ada blockchain. <br>
 * For more details, see <a href="https://tatum.io/apidoc#operation/AdaGetRawTransaction" target="_blank">Tatum API documentation</a>
 */
export const adaGetTransaction = async (hash: string): Promise<AdaTransaction> => get(`/v3/ada/transaction/${hash}`)

/**
 * Returns transactions by address from Ada blockchain. <br>
 *
 * @param address For which address will be transactions returned.
 * @param limit How many transactions will be returned. Max number of transactions per page is 50.
 * @param offset Offset to obtain the next page of data.
 *
 * For more details, see <a href="https://tatum.io/apidoc#operation/AdaGetTxByAddress" target="_blank">Tatum API documentation</a>
 */
export const adaGetTransactionsByAccount = async (address: string, pageSize = 50, offset = 0): Promise<AdaTransaction[]> =>
  get(`/v3/ada/transaction/address/${address}?pageSize=${pageSize}&offset=${offset}`)

/**
 * Returns UTXOs by address from Ada blockchain. <br>
 * For more details, see <a href="https://tatum.io/apidoc#operation/AdaGetTxByAddress" target="_blank">Tatum API documentation</a>
 */
export const adaGetUtxos = async (address: string): Promise<AdaUtxo[]> => get(`/v3/ada/${address}/utxos`)
