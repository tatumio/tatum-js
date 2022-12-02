/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * <p>The <code>MintNftAlgorand</code> schema lets you mint NFTs natively on Algorand and sign the transaction with your private key.<br/>For more information, see "Minting NFTs natively on a blockchain" in <a href="#operation/NftMintErc721">Mint an NFT</a>.</p><br/>
 */
export type MintNftAlgorand = {
    /**
     * The blockchain to work with
     */
    chain: 'ALGO';
    /**
     * The URL pointing to the NFT metadata; for more information, see <a href="https://eips.ethereum.org/EIPS/eip-721#specification" target="_blank">EIP-721</a>
     */
    url: string;
    /**
     * The name of the NFT
     */
    name: string;
    /**
     * The private key of the minting account; the transaction fee will be paid from this account
     */
    fromPrivateKey: string;
    /**
     * The transaction fee in Algos
     */
    fee?: string;
    attr?: {
        /**
         * The unit name of the NFT
         */
        assetUnit?: string;
        /**
         * The address of the clawback account that can claw back holdings of the NFT
         */
        clawback?: string;
        /**
         * The address of the manager account that can manage the configuration of the NFT or burn it; specify this parameter if you want to be able to <a href="#operation/NftBurnErc721">burn the minted NFT</a> any time later
         */
        manager?: string;
        /**
         * The address of the reserve account that holds the reserve (non-minted) units of the NFT
         */
        reserve?: string;
        /**
         * The address of the freeze account that is used to freeze holdings of the NFT
         */
        freeze?: string;
        /**
         * The total amount of the NFTs to mint. Defaults to 1 - which means 1 NFT will be minted.<br/>Value above 1 means, you are going to mint <a href="https://developer.algorand.org/docs/get-started/tokenization/nft/#fractional-nfts" target="_blank">Fractional NFTs.</a>In this case value must be a power of 10 larger than 1 e.g. 10, 100, 1000...
         */
        total?: number;
        /**
         * The decimal places of the NFT to mint. Defaults to 0 - which means 1 NFT will be minted.<br/>Value above 0 means, you are going to mint <a href="https://developer.algorand.org/docs/get-started/tokenization/nft/#fractional-nfts" target="_blank">Fractional NFTs.</a>In this case value must be equal to the logarithm in base 10 of total number of units (e.g. for total = 10, decimal will be 1)
         */
        decimals?: number;
    };
}
