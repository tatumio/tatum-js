/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type TransferNftAlgo = {
    /**
     * The blockchain to work with
     */
    chain: 'ALGO';
    /**
     * The blockchain address to transfer the NFT to
     */
    to: string;
    /**
     * The asset ID (the ID of the NFT)
     */
    contractAddress: string;
    /**
     * The private key of the sender's blockchain address
     */
    fromPrivateKey: string;
    /**
     * (For <a href="https://developer.algorand.org/docs/get-started/tokenization/nft/#fractional-nfts" target="_blank">fractional NFTs</a> only) The number of NFT fractions to transfer; if not set, defaults to 1, which means that one fraction of the NFT will be transferred
     */
    amount?: number;
    /**
     * The transaction fee in Algos
     */
    fee?: string;
}
