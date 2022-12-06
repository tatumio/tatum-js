/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * <p>The <code>MintNftExpress</code> schema lets you mint NFTs on BNB Smart Chain, Celo, Ethereum, Harmony, Klaytn, and Polygon using <b>NTF Express</b> with the pre-built smart contract provided by Tatum.<br/>For more information, see "Use the pre-built smart contract provided by Tatum to mint NFTs" in <a href="#operation/NftMintErc721">Mint an NFT</a>.</p><br/>
 */
export type MintNftExpress = {
    /**
     * The blockchain to work with
     */
    chain: 'BSC' | 'CELO' | 'ETH' | 'KLAY' | 'MATIC' | 'ONE';
    /**
     * The blockchain address to send the NFT to
     */
    to: string;
    /**
     * The URL pointing to the NFT metadata; for more information, see <a href="https://eips.ethereum.org/EIPS/eip-721#specification" target="_blank">EIP-721</a>
     */
    url: string;
}
