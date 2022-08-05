/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { SolanaNftMetadataCreator } from './SolanaNftMetadataCreator';

export type SolanaNftMetadata = {
    /**
     * Name of the NFT token.
     */
    name: string;
    /**
     * Symbol of the NFT token.
     */
    symbol: string;
    /**
     * Basis points of the seller fee.
     */
    sellerFeeBasisPoints: number;
    /**
     * Metadata of the token. See https://eips.ethereum.org/EIPS/eip-721#specification for more details.
     */
    uri: string;
    /**
     * Blockchain address of the Collection, where NFT will be minted in.
     */
    collection?: string;
    /**
     * If NFT metadata are mutable or not. Defaults to true.
     */
    mutable?: boolean;
    /**
     * Royalty receivers for NFT transfers.
     */
    creators?: Array<SolanaNftMetadataCreator>;
}
