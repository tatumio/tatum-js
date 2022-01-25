/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type ScryptaInfo = {
    version?: string;
    protocolversion?: number;
    walletversion?: number;
    balance?: number;
    obfuscation_balance?: number;
    blocks?: number;
    timeoffset?: number;
    connections?: number;
    proxy?: string;
    difficulty?: number;
    testnet?: boolean;
    keypoololdest?: number;
    keypoolsize?: number;
    paytxfee?: number;
    relayfee?: number;
    'staking status'?: string;
    errors?: string;
    indexed?: number;
    toindex?: number;
    checksum?: string;
    node?: string;
}
