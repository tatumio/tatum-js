/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Chain } from './Chain';
import type { TokenType } from './TokenType';

export type FungibleTokenBalance = {
    chain: Chain;
    type: TokenType;
    address: string;
    balance: string;
    tokenAddress: string;
    lastUpdatedBlockNumber: number;
}
