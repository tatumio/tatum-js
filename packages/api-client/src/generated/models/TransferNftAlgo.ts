/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type TransferNftAlgo = {
    /**
     * The blockchain to work with
     */
    chain: 'ALGO';
    /**
     * Blockchain address to send NFT token to
     */
    to: string;
    /**
     * AssetID of token.
     */
    contractAddress: string;
    /**
     * Private key of sender address.
     */
    fromPrivateKey: string;
    /**
     * The transaction fee in Algos
     */
    fee?: string;
    /**
     * The total amount of the NFTs to transfer. Defaults to 1 - which means 1 NFT will be transferred. Value above 1 means, you are going to transfer <a href="https://developer.algorand.org/docs/get-started/tokenization/nft/#fractional-nfts" target="_blank">Fractional NFTs.</a>
     */
    amount?: number;
}
