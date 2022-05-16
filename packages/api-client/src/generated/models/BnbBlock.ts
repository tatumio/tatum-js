/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type BnbBlock = {
    timestamp?: number;
    blockHeight?: number;
    tx?: Array<{
        txHash?: string;
        blockHeight?: number;
        txType?: string;
        timeStamp?: string;
        fromAddr?: string;
        toAddr?: string;
        value?: string;
        txAsset?: string;
        txFee?: string;
        code?: number;
        memo?: string;
        source?: number;
        sequence?: number;
    }>;
}
