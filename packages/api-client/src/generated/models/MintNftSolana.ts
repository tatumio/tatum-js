/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { SolanaNftMetadata } from './SolanaNftMetadata';

export type MintNftSolana = {
    /**
     * The blockchain to work with
     */
    chain: 'SOL';
    /**
     * The blockchain address to send the NFT to
     */
    to: string;
    /**
     * The blockchain address to mint the NFT from. The transaction fee will be paid from this address.
     */
    from: string;
    /**
     * The private key of the sender's address
     */
    fromPrivateKey: string;
    /**
     * The private key of the collection verifier (owner) who will verify the NFT in the NFT collection where the NFT is minted in. The blockchain address of this collection is specified in the <code>collection</code> parameter in the <code>metadata</code> section of the request body. To know more about Solana collections and verification, refer to the <a href="https://docs.metaplex.com/programs/token-metadata/certified-collections" target="_blank">Solana user documentation</a>.
     */
    collectionVerifierPrivateKey?: string;
    metadata: SolanaNftMetadata;
}
