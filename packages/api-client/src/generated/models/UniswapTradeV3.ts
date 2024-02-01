/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { UniswapTrade } from './UniswapTrade';

export type UniswapTradeV3 = (UniswapTrade & {
    /**
     * The net amount of the first token involved in the trade.
     */
    amount0?: string;
    /**
     * The net amount of the second token involved in the trade.
     */
    amount1?: string;
    /**
     * The square root price of the trading pair scaled by 2^96.
     */
    sqrtPriceX96?: string;
    /**
     * The liquidity of the trading pair at the time of the trade.
     */
    liquidity?: string;
    /**
     * The tick index of the Uniswap V3 pool at the time of the trade.
     */
    tick?: number;
});
