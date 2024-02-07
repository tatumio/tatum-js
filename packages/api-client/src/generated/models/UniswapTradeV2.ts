/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { UniswapTrade } from './UniswapTrade';

export type UniswapTradeV2 = (UniswapTrade & {
    /**
     * The input amount of the first token in the trade.
     */
    amount0In?: string;
    /**
     * The input amount of the second token in the trade.
     */
    amount1In?: string;
    /**
     * The output amount of the first token in the trade.
     */
    amount0Out?: string;
    /**
     * The output amount of the second token in the trade.
     */
    amount1Out?: string;
});
