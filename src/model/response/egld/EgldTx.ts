/**
 *
 * @export
 * @interface EgldTransaction
 */

export interface EgldTransaction {
    type: string
    nonce: number
    round: number
    epoch: number
    value: string
    receiver: string
    sender: string
    gasPrice: number
    gasLimit: number
    data: string
    signature: string
    sourceShard: number
    destinationShard: number
    blockNonce: number
    blockHash: string
    notarizedAtSourceInMetaNonce: number
    NotarizedAtSourceInMetaHash: string
    notarizedAtDestinationInMetaNonce: number
    notarizedAtDestinationInMetaHash: string
    miniblockType: string
    miniblockHash: string
    timestamp: number
    status: string
    hyperblockNonce: number
    hyperblockHash: string
}
