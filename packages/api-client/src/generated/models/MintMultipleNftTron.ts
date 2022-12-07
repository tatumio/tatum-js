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
     * Metadata of the token. See https://eips.ethereum.org/EIPS/eip-721#specification for more details.
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
