/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CustomFee } from './CustomFee';

export type AddMultiTokenMinter = {
    /**
     * Chain to work with.
     */
    chain: 'ETH' | 'MATIC' | 'KCS' | 'KLAY' | 'CELO' | 'ONE' | 'BSC' | 'FLR' | 'CRO' | 'BASE' | 'AVAX' | 'OPTIMISM' | 'FTM';
    /**
     * Address of MultiToken token
     */
    contractAddress: string;
    /**
     * Address of MultiToken minter
     */
    minter: string;
    /**
     * Private key of sender address. Private key, or signature Id must be present.
     */
    fromPrivateKey: string;
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
