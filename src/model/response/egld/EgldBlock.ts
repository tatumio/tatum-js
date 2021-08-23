/**
 *
 * @export
 * @interface EgldBlock
 */

export interface EgldInBlockTransaction {
    type: string
    hash: string
    nonce: number
    value: string
    receiver: string
    sender: string
    gasPrice: number
    gasLimit: number
    data: string
    signature: string
    status: string
}

export interface EgldShardBlock {
    hash: string
    nonce: number
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
    transactions: EgldInBlockTransaction[]
}
