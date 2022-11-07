/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * <p>The <code>MintNftAlgorandKMS</code> schema lets you mint NFTs natively on Algorand and sign the transaction with your signature ID.<br/>For more information, see "Minting NFTs natively on a blockchain" in <a href="#operation/NftMintErc721">Mint an NFT</a>.</p><br/>
 */
export type MintNftAlgorandKMS = {
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
     * The address of the minting account
     */
    from: string;
    /**
     * The KMS identifier of the private key of the minting account; the transaction fee will be paid from this account
     */
    signatureId: string;
    /**
     * If signatureId is mnemonic-based, this is the index to the specific address from that mnemonic.
     */
    index?: number;
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
    };
}
