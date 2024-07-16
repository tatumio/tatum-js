/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type WorkchainDescr = {
    workchain: number;
    enabled_since: number;
    actual_min_split: number;
    min_split: number;
    max_split: number;
    basic: number;
    active: boolean;
    accept_msgs: boolean;
    flags: number;
    zerostate_root_hash: string;
    zerostate_file_hash: string;
    version: number;
};
