import { BlockHash, get, post, TransactionHash } from '@tatumio/tatum-core'
import {ScryptaBlock, ScryptaInfo, ScryptaTx, ScryptaUTXO} from '../model'

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/BroadcastsignedScryptatransaction" target="_blank">Tatum API documentation</a>
 */
export const scryptaBroadcast = async (txData: string, signatureId?: string): Promise<TransactionHash> =>
  post(`/v3/scrypta/broadcast`, { txData, signatureId })

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/ScryptaGetBlockChainInfo" target="_blank">Tatum API documentation</a>
 */
export const scryptaGetCurrentBlock = async (): Promise<ScryptaInfo> => get(`/v3/scrypta/info`)

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/ScryptaGetBlock" target="_blank">Tatum API documentation</a>
 */
export const scryptaGetBlock = async (hash: string): Promise<ScryptaBlock> => get(`/v3/scrypta/block/${hash}`)

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/ScryptaGetBlockHash" target="_blank">Tatum API documentation</a>
 */
export const scryptaGetBlockHash = async (i: number): Promise<BlockHash> => get(`/v3/scrypta/block/hash/${i}`)

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/ScryptaGetUTXO" target="_blank">Tatum API documentation</a>
 */
export const scryptaGetUTXO = async (hash: string, i: number): Promise<ScryptaUTXO> => get(`/v3/scrypta/utxo/${hash}/${i}`)

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/ScryptaGetTxByAddress" target="_blank">Tatum API documentation</a>
 */
export const scryptaGetTxForAccount = async (address: string, pageSize = 50, offset = 0): Promise<ScryptaTx[]> =>
  get(`/v3/scrypta/transaction/address/${address}?pageSize=${pageSize}&offset=${offset}`)

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/ScryptaGetTxByAddress" target="_blank">Tatum API documentation</a>
 */
export const scryptaGetUnspentForAccount = async (address: string, pageSize = 50, offset = 0): Promise<ScryptaUTXO[]> =>
  get(`/v3/scrypta/utxo/${address}?pageSize=${pageSize}&offset=${offset}`)

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/ScryptaGetRawTransaction" target="_blank">Tatum API documentation</a>
 */
export const scryptaGetTransaction = async (hash: string): Promise<ScryptaTx> => get(`/v3/scrypta/transaction/${hash}`)