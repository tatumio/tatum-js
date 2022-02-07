/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type TransferErc721Celo = {
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
     * Nonce to be set to Celo transaction. If not present, last known nonce will be used.
     */
    nonce?: number;
    /**
     * Currency to pay for transaction gas
     */
    feeCurrency?: 'CELO' | 'CUSD' | 'CEUR';
}
