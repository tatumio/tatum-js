export interface GetBlockTransactionsExt {
  workchain: number;
  shard: number;
  seqno: number;
  root_hash?: string;
  file_hash?: string;
  after_lt?: number;
  after_hash?: string;
  count?: number;
}
