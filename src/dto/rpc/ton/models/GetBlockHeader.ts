export interface GetBlockHeader {
  workchain: number;
  shard: number;
  seqno: number;
  root_hash?: string;
  file_hash?: string;
}
