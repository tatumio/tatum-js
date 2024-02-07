/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Chain } from './Chain';
import type { TokenType } from './TokenType';

export type NativeTokenBalance = {
    chain: Chain;
    type: TokenType;
    address: string;
    balance: string;
}
