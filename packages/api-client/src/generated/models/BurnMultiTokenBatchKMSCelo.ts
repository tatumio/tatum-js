/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type BurnMultiTokenBatchKMSCelo = {
    /**
     * Chain to work with.
     */
    chain: 'CELO';
    /**
     * Address of holder
     */
    account: string;
    /**
     * IDs of token to be destroyed.
     */
    tokenId: Array<string>;
    /**
     * amounts of token to be destroyed.
     */
    amounts?: Array<string>;
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
