/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CustomFee } from './CustomFee';

export type UpdateCashbackValueForAuthorNftCelo = {
    /**
     * Chain to work with.
     */
    chain: 'CELO';
    /**
     * ID of token to be updated.
     */
    tokenId: string;
    /**
     * New royalty cashback to be set for the author of token with tokenId. If set to 0, royalty is disabled for this token.
     */
    cashbackValue: string;
    /**
     * Address of NFT token
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
