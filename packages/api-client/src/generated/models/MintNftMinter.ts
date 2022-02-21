/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type MintNftMinter = {
    /**
     * Chain to work with.
     */
    chain: 'ETH' | 'MATIC' | 'CELO' | 'ONE' | 'BSC';
    /**
     * ID of token to be created.
     */
    tokenId: string;
    /**
     * Blockchain address to send NFT token to
     */
    to: string;
    /**
     * Address of NFT token
     */
    contractAddress?: string;
    /**
     * Address of the minter of the token, who will be used for paying the fees. Must be used from one of our listed minter addresses.
     */
    minter: string;
    /**
     * Metadata of the token. See https://eips.ethereum.org/EIPS/eip-721#specification for more details.
     */
    url: string;
}
