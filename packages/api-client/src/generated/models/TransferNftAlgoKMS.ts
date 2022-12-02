/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type TransferNftAlgoKMS = {
    /**
     * The blockchain to work with
     */
    chain: 'ALGO';
    /**
     * Blockchain address to send NFT token from
     */
    from: string;
    /**
     * Blockchain address to send NFT token to
     */
    to: string;
    /**
     * AssetID of token.
     */
    contractAddress: string;
    /**
     * The transaction fee in Algos
     */
    fee?: string;
    /**
     * Identifier of the private key associated in signing application. Private key, or signature Id must be present.
     */
    signatureId: string;
    /**
     * The total amount of NFT fractions to transfer. Defaults to 1 - which means 1 fraction of NFT will be transferred. This is only valid for <a href="https://developer.algorand.org/docs/get-started/tokenization/nft/#fractional-nfts" target="_blank">Fractional NFTs.</a>
     */
    amount?: number;
}
