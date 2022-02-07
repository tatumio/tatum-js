/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type DeployNftCeloKMS = {
    /**
     * Chain to work with.
     */
    chain: 'CELO';
    /**
     * Name of the NFT token
     */
    name: string;
    /**
     * True if the contract is publicMint type
     */
    publicMint?: boolean;
    /**
     * Symbol of the NFT token
     */
    symbol: string;
    /**
     * If signatureId is mnemonic-based, this is the index to the specific address from that mnemonic.
     */
    index?: number;
    /**
     * Identifier of the private key associated in signing application. Private key, or signature Id must be present.
     */
    signatureId: string;
    nonce?: number;
    /**
     * True if the contract is provenance type
     */
    provenance?: boolean;
    /**
     * Currency to pay for transaction gas
     */
    feeCurrency: 'CELO' | 'CUSD' | 'CEUR';
}
