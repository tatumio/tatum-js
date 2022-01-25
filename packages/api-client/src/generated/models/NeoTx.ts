/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type NeoTx = {
    txid?: string;
    size?: number;
    type?: string;
    version?: number;
    attributes?: Array<any>;
    vin?: Array<{
        txid?: string;
        vout?: number;
    }>;
    vout?: Array<{
        'n'?: number;
        asset?: string;
        value?: string;
        address?: string;
    }>;
    sys_fee?: string;
    net_fee?: string;
    scripts?: Array<{
        invocation?: string;
        verification?: string;
    }>;
    blockhash?: string;
    confirmations?: number;
    blocktime?: number;
}
