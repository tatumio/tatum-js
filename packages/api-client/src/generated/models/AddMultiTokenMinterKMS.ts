/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CustomFee } from './CustomFee';

export type AddMultiTokenMinterKMS = {
    /**
     * Chain to work with.
     */
    chain: 'ETH' | 'MATIC' | 'KCS' | 'KLAY' | 'CELO' | 'ONE' | 'BSC';
    /**
     * Address of MultiToken token
     */
    contractAddress: string;
    /**
     * Address of MultiToken minter
     */
    minter: string;
    /**
     * If signatureId is mnemonic-based, this is the index to the specific address from that mnemonic.
     */
    index?: number;
    /**
     * Identifier of the private key associated in signing application. Private key, or signature Id must be present.
     */
    signatureId: string;
    /**
     * Nonce to be set to Ethereum transaction. If not present, last known nonce will be used.
     */
    nonce?: number;
    fee?: CustomFee;
    /**
     * Currency to pay for transaction gas, only valid for CELO chain.
     */
    feeCurrency?: 'CELO' | 'CUSD' | 'CEUR';
}
