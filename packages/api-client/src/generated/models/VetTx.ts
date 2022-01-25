/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type VetTx = {
    id?: string;
    chainTag?: string;
    blockRef?: string;
    expiration?: number;
    clauses?: Array<{
        to?: string;
        value?: string;
        data?: string;
    }>;
    gasPriceCoef?: number;
    gas?: number;
    origin?: string;
    nonce?: string;
    size?: number;
    meta?: {
        blockID?: string;
        blockNumber?: number;
        blockTimestamp?: number;
    };
    blockNumber?: number;
}
