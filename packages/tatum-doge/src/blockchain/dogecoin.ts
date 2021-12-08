import { get, post, BlockHash, TransactionHash } from '@tatumio/tatum-core'
import { DogeBlock, DogeInfo, DogeTx, DogeUTXO } from '../model'

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/DogeBroadcast" target="_blank">Tatum API documentation</a>
 */
export const broadcast = async (txData: string, signatureId?: string): Promise<TransactionHash> =>
  post(`/v3/dogecoin/broadcast`, { txData, signatureId })

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/DogeGetBlockChainInfo" target="_blank">Tatum API documentation</a>
 */
export const getCurrentBlock = async (): Promise<DogeInfo> => get(`/v3/dogecoin/info`)

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/DogeGetBlock" target="_blank">Tatum API documentation</a>
 */
export const getBlock = async (hash: string): Promise<DogeBlock> => get(`/v3/dogecoin/block/${hash}`)

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/DogeGetBlockHash" target="_blank">Tatum API documentation</a>
 */
export const getBlockHash = async (i: number): Promise<BlockHash> => get(`/v3/dogecoin/block/hash/${i}`)

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/DogeGetUTXO" target="_blank">Tatum API documentation</a>
 */
export const getUTXO = async (hash: string, i: number): Promise<DogeUTXO> => get(`/v3/dogecoin/utxo/${hash}/${i}`)

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/DogeGetRawTransaction" target="_blank">Tatum API documentation</a>
 */
export const getTransaction = async (hash: string): Promise<DogeTx> => get(`/v3/dogecoin/transaction/${hash}`)
