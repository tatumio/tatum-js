/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type TransferNftAlgoExpress = {
    /**
     * The blockchain to work with
     */
    chain: 'ALGO';
    /**
     * Value to be sent.
     */
    value?: string;
    /**
     * Blockchain address to send NFT token to
     */
    to: string;
    /**
     * Blockchain address to send NFT token from
     */
    from: string;
    /**
     * AssetID of token.
     */
    contractAddress: string;
    /**
     * The transaction fee in Algos
     */
    fee?: string;
    /**
     * The total amount of the NFTs to transfer. Defaults to 1 - which means 1 NFT will be minted. Value above 1 means, you are going to transfer <a href="https://developer.algorand.org/docs/get-started/tokenization/nft/#fractional-nfts" target="_blank">Fractional NFTs.</a>
     */
    amount?: number;
    /**
     * The decimal places of the NFT to transfer. Defaults to 0 - which means regular NFT will be transfered. Value above 0 means, you are going to transfer <a href="https://developer.algorand.org/docs/get-started/tokenization/nft/#fractional-nfts" target="_blank">Fractional NFTs.</a>
     */
    decimals?: number;
}
