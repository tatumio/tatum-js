/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type MintMultipleNftMinter = {
    /**
     * Chain to work with.
     */
    chain: 'ETH' | 'MATIC' | 'CELO' | 'KCS' | 'ONE' | 'KLAY' | 'BSC';
    /**
     * Blockchain address to send NFT token to.
     */
    to: Array<string>;
    /**
     * ID of token to be created.
     */
    tokenId: Array<string>;
    /**
     * Address of NFT minter, which will be used to mint the tokens. From this address, transaction fees will be deducted.
     */
    minter: string;
    /**
     * Metadata of the token. See https://eips.ethereum.org/EIPS/eip-721#specification for more details.
     */
    url: Array<string>;
    /**
     * Address of NFT token
     */
    contractAddress: string;
    /**
     * Currency to pay for transaction gas, only valid for CELO chain.
     */
    feeCurrency?: 'CELO';
}
