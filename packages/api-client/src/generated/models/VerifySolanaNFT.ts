/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type VerifySolanaNFT = {
    /**
     * The blockchain to work with
     */
    chain: 'SOL';
    /**
     * The blockchain address of the NFT to verify
     */
    nftAddress: string;
    /**
     * The blockchain address of the NFT collection where the NFT should be verified in. The collection must be a sized collection that was introduced in <a href="https://docs.metaplex.com/programs/token-metadata/changelog/v1.3" target="_blank">Version 1.3</a> of the Metaplex Token Metadata program.
     */
    collectionAddress: string;
    /**
     * The blockchain address of the collection verifier on behalf of whom the transaction will be originated. The transaction fee will be paid from this address.
     */
    from: string;
    /**
     * The private key of the collection verifier's address
     */
    fromPrivateKey: string;
}
