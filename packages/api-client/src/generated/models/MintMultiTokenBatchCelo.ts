/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type MintMultiTokenBatchCelo = {
    /**
     * Chain to work with.
     */
    chain: 'CELO';
    /**
     * The IDs of the Multi Tokens to be created.
     */
    tokenId: Array<Array<string>>;
    /**
     * The amounts of the Multi Tokens to be created.
     */
    amounts: Array<Array<string>>;
    /**
     * Data in bytes
     */
    data?: string;
    /**
     * The blockchain address to send the Multi Tokens to
     */
    to: Array<string>;
    /**
     * The address of the Multi Token smart contract
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
