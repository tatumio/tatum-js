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
         * (For minting the a <a href="https://developer.algorand.org/docs/get-started/tokenization/nft/#fractional-nfts" target="_blank">fractional NFT</a>) The number of fractions that the minted NFT should be divided into<br/>The number must be a power of 10 and greater that 1, for example, 10, 100, 1000...<br/>If not set, the parameter defaults to 1, which means that one regular (not fractional) NFT will be minted.
         */
        total?: number;
        /**
         * (For minting the NFT as a <a href="https://developer.algorand.org/docs/get-started/tokenization/nft/#fractional-nfts" target="_blank">fractional NFT</a>) The number of decimal places in a fraction of the minted NFT<br/>The number must be greater that 0 and equal to the logarithm in base 10 of the number of the fractions (see the <code>total</code> parameter); for example, if <code>total</code> is set to 10, <code>decimals</code> must be set to 1.<br/>If not set, the parameter defaults to 0, which means that one regular (not fractional) NFT will be minted.
         */
        decimals?: number;
    };
}
