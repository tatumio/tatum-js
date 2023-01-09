/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { TokenBalance } from './TokenBalance';

export type SolanaTxMeta = {
    err?: any;
    fee?: number;
    innerInstructions?: Array<any>;
    logMessages?: Array<string>;
    postBalances?: Array<number>;
    postTokenBalances?: Array<TokenBalance>;
    preBalances?: Array<number>;
    preTokenBalances?: Array<TokenBalance>;
    rewards?: Array<any>;
    status?: {
        Ok?: string;
    };
}
