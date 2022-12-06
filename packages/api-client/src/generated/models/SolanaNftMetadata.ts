/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { SolanaNftMetadataCreator } from './SolanaNftMetadataCreator';

export type SolanaNftMetadata = {
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
     * The blockchain address of the NFT collection where the NFT will be minted in. Specify the private key of the collection verifier in the <code>collectionVerifierPrivateKey</code> parameter of the request body to get the NFT verified in the collection after the NFT has been minted. To know more about Solana collections and verification, refer to the <a href="https://docs.metaplex.com/programs/token-metadata/certified-collections" target="_blank">Solana user documentation</a>.
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
