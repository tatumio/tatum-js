/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { SolanaNftMetadataCreator } from './SolanaNftMetadataCreator';

export type SolanaNftMetadataKMS = {
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
     * The blockchain address of the NFT collection where the NFT will be minted in. The minted NFT will get verified in the collection on behalf of the blockchain address specified in the <code>from</code> parameter. To know more about Solana collections and verification, refer to the <a href="https://docs.metaplex.com/programs/token-metadata/certified-collections" target="_blank">Solana user documentation</a> and <a href="https://apidoc.tatum.io/tag/NFT-(ERC-721-or-compatible)#operation/NftVerifyInCollection" target="_blank">NFT verification API</a>.
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
