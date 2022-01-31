/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type BurnErc721Celo = {
    /**
     * ID of token to be destroyed.
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
    feeCurrency: 'CELO' | 'CUSD' | 'CEUR';
}
