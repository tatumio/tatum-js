/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { DecodedDataCommon } from './DecodedDataCommon';

export type UniswapTrade = (DecodedDataCommon & {
    /**
     * The address of the first token involved in the trade.
     */
    token0?: string;
    /**
     * The address of the second token involved in the trade.
     */
    token1?: string;
    /**
     * Indicates whether the trade data is partially raw or not.
     */
    partiallyRaw?: boolean;
});
