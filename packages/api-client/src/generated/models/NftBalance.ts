/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Chain } from './Chain';
import type { TokenType } from './TokenType';

export type NftBalance = {
    chain: Chain;
    type: TokenType;
    address: string;
    balance: string;
    tokenAddress: string;
    tokenId?: string;
    metadataURI?: string;
    lastUpdatedBlockNumber: number;
    metadata?: any;
}
