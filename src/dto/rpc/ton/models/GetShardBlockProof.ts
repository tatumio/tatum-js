export interface GetShardBlockProof {
  workchain: number
  shard: number
  seqno: number
  from_seqno?: number
}
