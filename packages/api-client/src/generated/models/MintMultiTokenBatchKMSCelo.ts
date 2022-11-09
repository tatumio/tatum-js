/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CustomFee } from './CustomFee';

export type MintMultiTokenBatchKMSCelo = {
    /**
     * Chain to work with.
     */
    chain: 'CELO';
    /**
     * The blockchain address to send the Multi Tokens to.
     */
    to: Array<string>;
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
     * The address of the Multi Token smart contract
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
    fee?: CustomFee;
}
