import { get, post } from '../connector/tatum'
import {BlockHash, LtcBlock, LtcInfo, LtcTx, LtcUTXO, TransactionHash} from '../model'

/**
 * For more details, see <a href="https://apidoc.tatum.io/#operation/LtcBroadcast" target="_blank">Tatum API documentation</a>
 */
export const ltcBroadcast = async (txData: string, signatureId?: string): Promise<TransactionHash> =>
  post(`/v3/litecoin/broadcast`, { txData, signatureId })

/**
 * For more details, see <a href="https://apidoc.tatum.io/#operation/LtcGetBalanceOfAddress" target="_blank">Tatum API documentation</a>
 */
export const ltcGetBalance = async (address: string): Promise<{ incoming: string, outgoing: string }> => get(`/v3/litecoin/address/balance/${address}`)

/**
 * For more details, see <a href="https://apidoc.tatum.io/#operation/LtcGetBlockChainInfo" target="_blank">Tatum API documentation</a>
 */
export const ltcGetCurrentBlock = async (): Promise<LtcInfo> => get(`/v3/litecoin/info`)

/**
 * For more details, see <a href="https://apidoc.tatum.io/#operation/LtcGetBlock" target="_blank">Tatum API documentation</a>
 */
export const ltcGetBlock = async (hash: string): Promise<LtcBlock> => get(`/v3/litecoin/block/${hash}`)

/**
 * For more details, see <a href="https://apidoc.tatum.io/#operation/LtcGetBlockHash" target="_blank">Tatum API documentation</a>
 */
export const ltcGetBlockHash = async (i: number): Promise<BlockHash> => get(`/v3/litecoin/block/hash/${i}`)

/**
 * For more details, see <a href="https://apidoc.tatum.io/#operation/LtcGetUTXO" target="_blank">Tatum API documentation</a>
 */
export const ltcGetUTXO = async (hash: string, i: number): Promise<LtcUTXO> => get(`/v3/litecoin/utxo/${hash}/${i}`)

/**
 * For more details, see <a href="https://apidoc.tatum.io/#operation/LtcGetTxByAddress" target="_blank">Tatum API documentation</a>
 */
export const ltcGetTxForAccount = async (address: string, pageSize = 50, offset = 0): Promise<LtcTx[]> =>
  get(`/v3/litecoin/transaction/address/${address}?pageSize=${pageSize}&offset=${offset}`)

/**
 * For more details, see <a href="https://apidoc.tatum.io/#operation/LtcGetRawTransaction" target="_blank">Tatum API documentation</a>
 */
export const ltcGetTransaction = async (hash: string): Promise<LtcTx> => get(`/v3/litecoin/transaction/${hash}`)
