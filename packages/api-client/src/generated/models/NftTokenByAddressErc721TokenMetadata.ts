/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { NftTokenByAddressErc721Metadata } from './NftTokenByAddressErc721Metadata';

export type NftTokenByAddressErc721TokenMetadata = {
    /**
     * (EVM-based blockchains only) The ID of the NFT owned by this address
     */
    tokenId?: string;
    /**
     * The URL pointing to the NFT metadata; the URL may not be present, and if it is not returned, you can get it by calling the NFT Contract.tokenURI() method
     */
    url?: string;
    metadata?: NftTokenByAddressErc721Metadata;
}
