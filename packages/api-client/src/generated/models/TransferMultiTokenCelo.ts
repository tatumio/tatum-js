/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type TransferMultiTokenCelo = {
    /**
     * Chain to work with.
     */
    chain: 'CELO';
    /**
     * Blockchain address to send Multi Token token to
     */
    to: string;
    /**
     * ID of token.
     */
    tokenId: string;
    /**
     * Amount of token.
     */
    amount: string;
    /**
     * Data in bytes
     */
    data?: string;
    /**
     * Address of Multi Token token
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
