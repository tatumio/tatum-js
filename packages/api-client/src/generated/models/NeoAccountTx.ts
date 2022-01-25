/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type NeoAccountTx = {
    txid?: string;
    blockHeight?: number;
    change?: {
        NEO?: string;
        GAS?: string;
    };
}
