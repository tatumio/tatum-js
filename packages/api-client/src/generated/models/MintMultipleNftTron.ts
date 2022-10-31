/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type MintMultipleNftTron = {
    /**
     * Chain to work with.
     */
    chain: 'TRON';
    /**
     * Blockchain address to send NFT token to.
     */
    to: Array<string>;
    /**
     * ID of token to be created.
     */
    tokenId: Array<string>;
    /**
     * The URL pointing to the NFT metadata; for more information, see <a href="https://eips.ethereum.org/EIPS/eip-721#specification" target="_blank">EIP-721</a>
     */
    url: Array<string>;
    /**
     * Address of NFT token
     */
    contractAddress: string;
    /**
     * Private key of sender address. Private key, or signature Id must be present.
     */
    fromPrivateKey: string;
    /**
     * Max limit for fee to be paid, in TRX.
     */
    feeLimit: number;
}
