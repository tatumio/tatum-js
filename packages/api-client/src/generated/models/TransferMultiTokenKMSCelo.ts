/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type TransferMultiTokenKMSCelo = {
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
     * amount of token.
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
     * If signatureId is mnemonic-based, this is the index to the specific address from that mnemonic.
     */
    index?: number;
    /**
     * Identifier of the private key associated in signing application. Private key, or signature Id must be present.
     */
    signatureId: string;
    /**
     * Nonce to be set to Celo transaction. If not present, last known nonce will be used.
     */
    nonce?: number;
    /**
     * Currency to pay for transaction gas
     */
    feeCurrency: 'CELO' | 'CUSD' | 'CEUR';
}
