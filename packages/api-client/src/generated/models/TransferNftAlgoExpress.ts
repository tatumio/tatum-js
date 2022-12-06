/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type TransferNftAlgoExpress = {
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
     * The total amount of NFT fractions to transfer. Defaults to 1 - which means 1 fraction of NFT will be transferred. This is only valid for <a href="https://developer.algorand.org/docs/get-started/tokenization/nft/#fractional-nfts" target="_blank">Fractional NFTs.</a>
     */
    amount?: number;
}
