/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CustomFee } from './CustomFee';

export type BurnMultiTokenBatchCelo = {
    /**
     * Chain to work with.
     */
    chain: 'CELO';
    /**
     * Address of holder
     */
    account: string;
    /**
     * The IDs of the Multi Tokens to be destroyed.
     */
    tokenId: Array<string>;
    /**
     * The amounts of the Multi Tokens to be destroyed.
     */
    amounts: Array<string>;
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
    fee?: CustomFee;
}
