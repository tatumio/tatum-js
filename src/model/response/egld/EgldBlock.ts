/**
 *
 * @export
 * @interface EgldBlock
 */

import { EgldTransaction } from './EgldTx'

export interface EgldShardBlock {
    hash: string
    nonce: number
    round: number
    shard: number
}

export interface EgldBlock {
    nonce: number
    round: number
    hash: string
    prevBlockHash: string
    epoch: number
    numTxs: number
    shardBlocks: EgldShardBlock[]
    transactions: EgldTransaction[]
    accumulatedFees: string
    developerFees: string
    accumulatedFeesInEpoch: string
    developerFeesInEpoch: string
    status: string
}
