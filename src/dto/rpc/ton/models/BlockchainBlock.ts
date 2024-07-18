/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { BlockValueFlow } from './BlockValueFlow';

export type BlockchainBlock = {
    tx_quantity: number;
    value_flow: BlockValueFlow;
    workchain_id: number;
    shard: string;
    seqno: number;
    root_hash: string;
    file_hash: string;
    global_id: number;
    version: number;
    after_merge: boolean;
    before_split: boolean;
    after_split: boolean;
    want_split: boolean;
    want_merge: boolean;
    key_block: boolean;
    gen_utime: number;
    start_lt: number;
    end_lt: number;
    vert_seqno: number;
    gen_catchain_seqno: number;
    min_ref_mc_seqno: number;
    prev_key_block_seqno: number;
    gen_software_version?: number;
    gen_software_capabilities?: number;
    master_ref?: string;
    prev_refs: Array<string>;
    in_msg_descr_length: number;
    out_msg_descr_length: number;
    rand_seed: string;
    created_by: string;
};
