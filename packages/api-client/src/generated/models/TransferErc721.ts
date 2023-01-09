/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type TransferErc721 = {
    /**
     * Blockchain address to send ERC721 token to
     */
    to: string;
    /**
     * ID of token.
     */
    tokenId: string;
    /**
     * Address of ERC721 token
     */
    contractAddress: string;
    /**
     * Private key of sender address. Private key, or signature Id must be present.
     */
    fromPrivateKey: string;
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
