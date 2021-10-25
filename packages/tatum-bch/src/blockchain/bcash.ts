import { TransactionHash, get, post, BlockHash } from '@tatumio/tatum-core'
import {BchBlock, BchInfo, BchTx} from '../model'

/**
 * Broadcasts signed transaction to the Bch blockchain. <br>
 * For more details, see <a href="https://tatum.io/apidoc#operation/BchBroadcast" target="_blank">Tatum API documentation</a>
 */
export const bcashBroadcast = async (txData: string, signatureId?: string): Promise<TransactionHash> =>
  post(`/v3/bcash/broadcast`, { txData, signatureId })

/**
 * Returns information about Bch blockchain. <br>
 * For more details, see <a href="https://tatum.io/apidoc#operation/BchGetBlockChainInfo" target="_blank">Tatum API documentation</a>
 */
export const bcashGetCurrentBlock = async (): Promise<BchInfo> => get(`/v3/bcash/info`)

/**
 * Returns block by its hash from Bch blockchain. <br>
 * For more details, see <a href="https://tatum.io/apidoc#operation/BchGetBlock" target="_blank">Tatum API documentation</a>
 */
export const bcashGetBlock = async (hash: string): Promise<BchBlock> => get(`/v3/bcash/block/${hash}`)

/**
 * Returns block hash by index from Bch blockchain. <br>
 * For more details, see <a href="https://tatum.io/apidoc#operation/BchGetBlockHash" target="_blank">Tatum API documentation</a>
 */
export const bcashGetBlockHash = async (i: number): Promise<BlockHash> => get(`/v3/bcash/block/hash/${i}`)

/**
 * Returns transactions for address from Bch blockchain. <br>
 *
 * @param address For which address will be transactions returned.
 * @param skip Offset how many transactions will be skipped.
 *
 * For more details, see <a href="https://tatum.io/apidoc#operation/BchGetTxByAddress" target="_blank">Tatum API documentation</a>
 */
export const bcashGetTxForAccount = async (address: string, skip = 0): Promise<BchTx[]> =>
  get(`/v3/bcash/transaction/address/${address}?skip=${skip}`)

/**
 * Returns transaction by hash from Bch blockchain. <br>
 * For more details, see <a href="https://tatum.io/apidoc#operation/BchGetRawTransaction" target="_blank">Tatum API documentation</a>
 */
export const bcashGetTransaction = async (hash: string): Promise<BchTx> => get(`/v3/bcash/transaction/${hash}`)