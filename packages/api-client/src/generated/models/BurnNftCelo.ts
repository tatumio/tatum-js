/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type BurnNftCelo = {
    /**
     * The blockchain to work with
     */
    chain: 'CELO';
    /**
     * ID of token to be destroyed.
     */
    tokenId: string;
    /**
     * Address of NFT token
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
     * The currency in which the transaction fee will be paid
     */
    feeCurrency: 'CELO' | 'CUSD' | 'CEUR';
}
