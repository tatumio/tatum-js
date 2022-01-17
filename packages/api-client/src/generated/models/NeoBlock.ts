/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type NeoBlock = {
    hash?: string;
    size?: number;
    version?: number;
    previousblockhash?: string;
    merkleroot?: string;
    time?: number;
    index?: number;
    nonce?: string;
    nextconsensus?: string;
    script?: {
        invocation?: string;
        verification?: string;
    };
    tx?: Array<{
        txid?: string;
        size?: number;
        type?: string;
        version?: number;
        attributes?: Array<any>;
        vin?: Array<any>;
        vout?: Array<any>;
        sys_fee?: string;
        net_fee?: string;
        scripts?: Array<any>;
        nonce?: number;
    }>;
    confirmations?: number;
    nextblockhash?: string;
}
