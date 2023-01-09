/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { SolanaNftMetadata } from './SolanaNftMetadata';

/**
 * <p>The <code>MintNftSolana</code> schema lets you mint NFTs natively on Solana and sign the transaction with your private key.<br/>For more information, see "Minting NFTs natively on a blockchain" in <a href="#operation/NftMintErc721">Mint an NFT</a>.</p><br/>
 */
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
     * The blockchain address that will pay the fee for the transaction
     */
    from: string;
    /**
     * The private key of the blockchain address that will pay the fee for the transaction
     */
    fromPrivateKey: string;
    /**
     * The private key of the collection verifier (owner) who will verify the NFT in the NFT collection where the NFT is minted in. The blockchain address of this collection is specified in the <code>collection</code> parameter in the <code>metadata</code> section of the request body. To know more about Solana collections and verification, refer to the <a href="https://docs.metaplex.com/programs/token-metadata/certified-collections" target="_blank">Solana user documentation</a>.
     */
    collectionVerifierPrivateKey?: string;
    metadata: SolanaNftMetadata;
}
