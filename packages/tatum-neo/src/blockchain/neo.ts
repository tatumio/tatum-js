import { get, post, TransactionHash } from '@tatumio/tatum-core'
import { NeoAsset, NeoBlock, NeoTx, NeoTxOutputs, NeoAccountTx } from '../model'

/**
 * For more details, see <a href="https://tatum.io/apidoc.php#operation/NeoBroadcast" target="_blank">Tatum API documentation</a>
 */
export const broadcast = async (txData: string): Promise<TransactionHash> => post(`/v3/neo/broadcast`, { txData })

/**
 * For more details, see <a href="https://tatum.io/apidoc.php#operation/NeoGetCurrentBlock" target="_blank">Tatum API documentation</a>
 */
export const getCurrentBlock = async (): Promise<number> => get(`/v3/neo/block/current`)

/**
 * For more details, see <a href="https://tatum.io/apidoc.php#operation/NeoGetBlock" target="_blank">Tatum API documentation</a>
 */
export const getBlock = async (hash: string): Promise<NeoBlock> => get(`/v3/neo/block/${hash}`)

/**
 * For more details, see <a href="https://tatum.io/apidoc.php#operation/NeoGetTransaction" target="_blank">Tatum API documentation</a>
 */
export const getTransaction = async (hash: string): Promise<NeoTx> => get(`/v3/neo/transaction/${hash}`)

/**
 * For more details, see <a href="https://tatum.io/apidoc.php#operation/NeoAsset" target="_blank">Tatum API documentation</a>
 */
export const getAssetDetail = (asset: string): Promise<NeoAsset> => get(`/v3/neo/asset/${asset}`)

/**
 * For more details, see <a href="https://tatum.io/apidoc.php#operation/NeoTxOut" target="_blank">Tatum API documentation</a>
 */
export const getUnspentOutputs = (txId: string, index: number): Promise<NeoTxOutputs> => get(`/v3/neo/transaction/out/${txId}/${index}`)

/**
 * For more details, see <a href="https://tatum.io/apidoc.php#operation/NeoAccountTx" target="_blank">Tatum API documentation</a>
 */
export const getAccountTransactions = async (address: string): Promise<NeoAccountTx[]> => get(`/v3/neo/account/tx/${address}`)
