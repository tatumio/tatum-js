/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type MintNftMinter = {
    /**
     * The blockchain to work with
     */
    chain: 'BSC' | 'CELO' | 'ETH' | 'KLAY' | 'MATIC' | 'ONE';
    /**
     * The token ID of the NFT
     */
    tokenId: string;
    /**
     * The blockchain address to send the NFT to
     */
    to: string;
    /**
     * The blockchain address of the smart contract to build the NFT on
     */
    contractAddress: string;
    /**
     * The blockchain address of the NFT minter
     */
    minter: string;
    /**
     * The link to the NFT metadata (see https://eips.ethereum.org/EIPS/eip-721#specification for more details)
     */
    url: string;
}
