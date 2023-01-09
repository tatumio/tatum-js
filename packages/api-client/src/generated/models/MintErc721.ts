/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type MintErc721 = {
    /**
     * ID of token to be created.
     */
    tokenId: string;
    /**
     * Blockchain address to send ERC721 token to
     */
    to: string;
    /**
     * Address of ERC721 token
     */
    contractAddress: string;
    /**
     * Metadata of the token. See https://eips.ethereum.org/EIPS/eip-721#specification for more details.
     */
    url: string;
    /**
     * Identifier of the private key associated in signing application. Private key, or signature Id must be present.
     */
    signatureId?: string;
    /**
     * The nonce to be set to the transaction; if not present, the last known nonce will be used
     */
    nonce?: number;
    /**
     * Custom defined fee. If not present, it will be calculated automatically.
     */
    fee?: {
        /**
         * Gas limit for transaction in gas price.
         */
        gasLimit: string;
        /**
         * Gas price in Gwei.
         */
        gasPrice: string;
    };
}
