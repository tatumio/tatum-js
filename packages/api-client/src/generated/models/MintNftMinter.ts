/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * <p>The <code>MintNftMinter</code> schema lets you mint NFTs on BNB Smart Chain, Celo, Ethereum, Harmony, Klaytn, Polygon and Horizen Eon using the <b>NTF minter</b>, a special blockchain address provided by Tatum that will cover the minting fees.<br/>For more information, see "Use your own smart contract to mint NFTs" in <a href="#operation/NftMintErc721">Mint an NFT</a>.</p><br/>
 */
export type MintNftMinter = {
    /**
     * The blockchain to work with
     */
    chain: 'BSC' | 'CELO' | 'ETH' | 'KLAY' | 'MATIC' | 'ONE' | 'ZEN';
    /**
     * The blockchain address of the smart contract to build the NFT on
     */
    contractAddress: string;
    /**
     * The blockchain address of the Tatum NFT minter; this is the address that you added as an NFT minter to your NFT smart contract
     */
    minter: string;
    /**
     * The blockchain address to send the NFT to
     */
    to: string;
    /**
     * The ID of the NFT
     */
    tokenId: string;
    /**
     * The URL pointing to the NFT metadata; for more information, see <a href="https://eips.ethereum.org/EIPS/eip-721#specification" target="_blank">EIP-721</a>
     */
    url: string;
}
