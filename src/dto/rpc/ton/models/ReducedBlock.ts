/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type ReducedBlock = {
    workchain_id: number;
    shard: string;
    seqno: number;
    master_ref?: string;
    tx_quantity: number;
    utime: number;
    shards_blocks: Array<string>;
    parent: Array<string>;
};
