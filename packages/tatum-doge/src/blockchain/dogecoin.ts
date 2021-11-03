import { get, post, BlockHash, TransactionHash } from '@tatumio/tatum-core'
import { DogeBlock, DogeInfo, DogeTx, DogeUTXO } from '../model'

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/DogeBroadcast" target="_blank">Tatum API documentation</a>
 */
export const dogeBroadcast = async (txData: string, signatureId?: string): Promise<TransactionHash> =>
    post(`/v3/dogecoin/broadcast`, {txData, signatureId})


/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/DogeGetBlockChainInfo" target="_blank">Tatum API documentation</a>
 */
export const dogeGetCurrentBlock = async (): Promise<DogeInfo> => get(`/v3/dogecoin/info`)

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/DogeGetBlock" target="_blank">Tatum API documentation</a>
 */
export const dogeGetBlock = async (hash: string): Promise<DogeBlock> => get(`/v3/dogecoin/block/${hash}`)

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/DogeGetBlockHash" target="_blank">Tatum API documentation</a>
 */
export const dogeGetBlockHash = async (i: number): Promise<BlockHash> => get(`/v3/dogecoin/block/hash/${i}`)

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/DogeGetUTXO" target="_blank">Tatum API documentation</a>
 */
export const dogeGetUTXO = async (hash: string, i: number): Promise<DogeUTXO> => get(`/v3/dogecoin/utxo/${hash}/${i}`)

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/DogeGetRawTransaction" target="_blank">Tatum API documentation</a>
 */
export const dogeGetTransaction = async (hash: string): Promise<DogeTx> => get(`/v3/dogecoin/transaction/${hash}`)
