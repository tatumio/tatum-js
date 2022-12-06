/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { SolanaNftMetadataCreator } from './SolanaNftMetadataCreator';

export type SolanaNftMetadataKMS = {
    /**
     * The name of the NFT
     */
    name: string;
    /**
     * The symbol or abbreviated name of the NFT
     */
    symbol: string;
    /**
     * The basis points of the seller fee
     */
    sellerFeeBasisPoints: number;
    /**
     * The URL pointing to the NFT metadata; for more information, see <a href="https://eips.ethereum.org/EIPS/eip-721#specification" target="_blank">EIP-721</a>
     */
    uri: string;
    /**
     * The blockchain address of the NFT collection where the NFT will be minted in. The minted NFT will get verified in the collection on behalf of the blockchain address specified in the <code>from</code> parameter. To know more about Solana collections and verification, refer to the <a href="https://docs.metaplex.com/programs/token-metadata/certified-collections" target="_blank">Solana user documentation</a> and <a href="https://apidoc.tatum.io/tag/NFT-(ERC-721-or-compatible)#operation/NftVerifyInCollection" target="_blank">NFT verification API</a>.
     */
    collection?: string;
    /**
     * Specifies whether the NFT metadata is mutable ("true") or immutable ("false"); if not set, defaults to "true"
     */
    mutable?: boolean;
    /**
     * The blockchain addresses where the royalties will be sent every time the minted NFT is transferred
     */
    creators?: Array<SolanaNftMetadataCreator>;
}
