/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CustomFee } from './CustomFee';

export type BurnMultiTokenCelo = {
    /**
     * Chain to work with.
     */
    chain: 'CELO';
    /**
     * Address of holder
     */
    account: string;
    /**
     * ID of token to be destroyed.
     */
    tokenId: string;
    /**
     * amount of token to be destroyed.
     */
    amount: string;
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
    fee?: CustomFee;
}
