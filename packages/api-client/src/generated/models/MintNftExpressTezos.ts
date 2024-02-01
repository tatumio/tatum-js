/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * <p>The <code>MintNftExpressTezos</code> schema lets you mint NFTs on Tezos using <b>NTF Express</b>. You don't need to provide the private key and Tatum will cover the minting fees. The price of the mint operation will be deducted from your credits. In order to use the mint you need to first deploy the smartcontract using NFT Express</p><br/>
 */
export type MintNftExpressTezos = {
    /**
     * The blockchain to work with
     */
    chain: 'TEZOS';
    /**
     * The URL pointing to the NFT metadata</a>
     */
    url: string;
    /**
     * The blockchain address of the smart contract to build the NFT on
     */
    contractAddress: string;
    /**
     * The blockchain address to send the NFT to
     */
    ownerAddress: string;
    /**
     * The ID of the NFT
     */
    tokenId: string;
}
