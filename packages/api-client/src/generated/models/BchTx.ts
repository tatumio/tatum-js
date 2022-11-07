/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type BchTx = {
    txid?: string;
    version?: number;
    locktime?: number;
    vin?: Array<{
        txid?: string;
        vout?: number;
        scriptSig?: {
            hex?: string;
            asm?: string;
        };
        coinbase?: string;
        sequence?: number;
    }>;
    vout?: Array<{
        value?: number;
        'n'?: number;
        scriptPubKey?: {
            hex?: string;
            asm?: string;
            addresses?: Array<string>;
            type?: string;
        };
    }>;
}
