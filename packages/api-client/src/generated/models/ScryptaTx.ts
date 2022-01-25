/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type ScryptaTx = {
    hash?: string;
    inputs?: Array<{
        txid?: string;
        vout?: number;
        scriptSig?: {
            asm?: string;
            hex?: string;
        };
        sequence?: number;
    }>;
    outputs?: Array<{
        value?: number;
        'n'?: number;
        scriptPubKey?: {
            asm?: string;
            hex?: string;
            reqSigs?: number;
            type?: string;
            addresses?: Array<string>;
        };
    }>;
    time?: number;
    blockhash?: string;
}
