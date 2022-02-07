/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type MintMultipleErc721Celo = {
    /**
     * Blockchain address to send ERC721 token to.
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
     * Address of ERC721 token
     */
    contractAddress: string;
    /**
     * Private key of sender address. Private key, or signature Id must be present.
     */
    fromPrivateKey: string;
    /**
     * Nonce to be set to Celo transaction. If not present, last known nonce will be used.
     */
    nonce?: number;
    /**
     * Currency to pay for transaction gas
     */
    feeCurrency: 'CELO' | 'CUSD' | 'CEUR';
}
