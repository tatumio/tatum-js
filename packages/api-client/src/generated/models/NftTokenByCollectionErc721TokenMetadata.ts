/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type NftTokenByCollectionErc721TokenMetadata = {
    /**
     * TokenID of the NFT token owned by this address.
     */
    tokenId?: string;
    /**
     * Metadata URL of the TokenID. This data don't have to be present, safest way (if not present) is to obtain them from the NFT Contract.tokenURI() method call.
     */
    url?: string;
    /**
     * Metadata scheme obtained from the url. This data don't have to be present, safest way (if not present) is to obtain them from the NFT Contract.tokenURI() method call.
     */
    metadata?: any;
}
