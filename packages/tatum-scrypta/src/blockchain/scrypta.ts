import { BlockHash, get, post, TransactionHash } from '@tatumio/tatum-core'
import { ScryptaBlock, ScryptaInfo, ScryptaTx, ScryptaUTXO } from '../model'

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/BroadcastsignedScryptatransaction" target="_blank">Tatum API documentation</a>
 */
export const broadcast = async (txData: string, signatureId?: string): Promise<TransactionHash> =>
  post(`/v3/scrypta/broadcast`, { txData, signatureId })

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/ScryptaGetBlockChainInfo" target="_blank">Tatum API documentation</a>
 */
export const getCurrentBlock = async (): Promise<ScryptaInfo> => get(`/v3/scrypta/info`)

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/ScryptaGetBlock" target="_blank">Tatum API documentation</a>
 */
export const getBlock = async (hash: string): Promise<ScryptaBlock> => get(`/v3/scrypta/block/${hash}`)

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/ScryptaGetBlockHash" target="_blank">Tatum API documentation</a>
 */
export const getBlockHash = async (i: number): Promise<BlockHash> => get(`/v3/scrypta/block/hash/${i}`)

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/ScryptaGetUTXO" target="_blank">Tatum API documentation</a>
 */
export const getUTXO = async (hash: string, i: number): Promise<ScryptaUTXO> => get(`/v3/scrypta/utxo/${hash}/${i}`)

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/ScryptaGetTxByAddress" target="_blank">Tatum API documentation</a>
 */
export const getTxForAccount = async (address: string, pageSize = 50, offset = 0): Promise<ScryptaTx[]> =>
  get(`/v3/scrypta/transaction/address/${address}?pageSize=${pageSize}&offset=${offset}`)

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/ScryptaGetTxByAddress" target="_blank">Tatum API documentation</a>
 */
export const getUnspentForAccount = async (address: string, pageSize = 50, offset = 0): Promise<ScryptaUTXO[]> =>
  get(`/v3/scrypta/utxo/${address}?pageSize=${pageSize}&offset=${offset}`)

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/ScryptaGetRawTransaction" target="_blank">Tatum API documentation</a>
 */
export const getTransaction = async (hash: string): Promise<ScryptaTx> => get(`/v3/scrypta/transaction/${hash}`)
