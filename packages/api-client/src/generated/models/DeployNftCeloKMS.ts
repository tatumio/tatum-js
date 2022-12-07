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
     * True if the contract is provenance percentage royalty type. False by default. <a href="https://github.com/tatumio/smart-contracts" target="_blank">Details and sources avaiable here.</a>
     */
    provenance?: boolean;
    /**
     * True if the contract is fixed price royalty type. False by default. <a href="https://github.com/tatumio/smart-contracts" target="_blank">Details and sources avaiable here.</a>
     */
    cashback?: boolean;
    /**
     * True if the contract is publicMint type. False by default.
     */
    publicMint?: boolean;
    /**
     * Currency to pay for transaction gas
     */
    feeCurrency: 'CELO' | 'CUSD' | 'CEUR';
}
