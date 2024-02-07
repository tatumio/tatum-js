/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Chain } from './Chain';
import type { NftMetadata } from './NftMetadata';
import type { NftMetadataURI } from './NftMetadataURI';
import type { TokenAddress } from './TokenAddress';
import type { TokenId } from './TokenId';
import type { TokenType } from './TokenType';

export type Token = {
    chain?: Chain;
    tokenId?: TokenId;
    tokenAddress?: TokenAddress;
    tokenType?: TokenType;
    metadataURI?: NftMetadataURI;
    metadata?: NftMetadata;
}
