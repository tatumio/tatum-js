/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Chain } from './Chain';
import type { TokenAddress } from './TokenAddress';
import type { TokenId } from './TokenId';
import type { TokenType } from './TokenType';

export type TokenTezos = {
    chain?: Chain;
    tokenId?: TokenId;
    tokenAddress?: TokenAddress;
    tokenType?: TokenType;
    /**
     * Address of the token creator.
     */
    creator?: string;
    /**
     * Name of the token.
     */
    name?: string;
}
