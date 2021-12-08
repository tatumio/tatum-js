import { get, post } from '@tatumio/tatum-core'
import { BlockHash, TransactionHash } from '@tatumio/tatum-core'
import { LtcBlock, LtcInfo, LtcTx, LtcUTXO } from '../model'

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/LtcBroadcast" target="_blank">Tatum API documentation</a>
 */
export const broadcast = async (txData: string, signatureId?: string): Promise<TransactionHash> =>
  post(`/v3/litecoin/broadcast`, { txData, signatureId })

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/LtcGetBalanceOfAddress" target="_blank">Tatum API documentation</a>
 */
export const getBalance = async (address: string): Promise<{ incoming: string; outgoing: string }> =>
  get(`/v3/litecoin/address/balance/${address}`)

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/LtcGetBlockChainInfo" target="_blank">Tatum API documentation</a>
 */
export const getCurrentBlock = async (): Promise<LtcInfo> => get(`/v3/litecoin/info`)

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/LtcGetBlock" target="_blank">Tatum API documentation</a>
 */
export const getBlock = async (hash: string): Promise<LtcBlock> => get(`/v3/litecoin/block/${hash}`)

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/LtcGetBlockHash" target="_blank">Tatum API documentation</a>
 */
export const getBlockHash = async (i: number): Promise<BlockHash> => get(`/v3/litecoin/block/hash/${i}`)

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/LtcGetUTXO" target="_blank">Tatum API documentation</a>
 */
export const getUTXO = async (hash: string, i: number): Promise<LtcUTXO> => get(`/v3/litecoin/utxo/${hash}/${i}`)

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/LtcGetTxByAddress" target="_blank">Tatum API documentation</a>
 */
export const getTxForAccount = async (address: string, pageSize = 50, offset = 0): Promise<LtcTx[]> =>
  get(`/v3/litecoin/transaction/address/${address}?pageSize=${pageSize}&offset=${offset}`)

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/LtcGetRawTransaction" target="_blank">Tatum API documentation</a>
 */
export const getTransaction = async (hash: string): Promise<LtcTx> => get(`/v3/litecoin/transaction/${hash}`)
