/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type MintMultipleNftMinter = {
    /**
     * The blockchain to work with
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
     * The URL pointing to the NFT metadata; for more information, see <a href="https://eips.ethereum.org/EIPS/eip-721#specification" target="_blank">EIP-721</a>
     */
    url: Array<string>;
    /**
     * Address of NFT token
     */
    contractAddress: string;
    /**
     * (Celo only) The currency in which the transaction fee will be paid
     */
    feeCurrency?: 'CELO';
}
