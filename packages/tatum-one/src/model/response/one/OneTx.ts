import { EthTx as EthLikeTx } from '@tatumio/tatum-core'

/**
 *
 * @export
 * @interface OneTx
 */
export interface OneTx extends EthLikeTx {
  hash: string
  shardID: number
  timestamp: number
  toShardID: number
  logsBloom: string
  root: string
}
