/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CustomFee } from './CustomFee';

export type GenerateCustodialWalletBatchCelo = {
    /**
     * Blockchain to work with.
     */
    chain: 'CELO';
    /**
     * Currency to pay for transaction gas
     */
    feeCurrency: 'CELO' | 'CUSD' | 'CEUR';
    /**
     * Private key of account, from which the transaction will be initiated.
     */
    fromPrivateKey: string;
    /**
     * Number of addresses to generate.
     */
    batchCount: number;
    /**
     * Owner of the addresses.
     */
    owner: string;
    fee?: CustomFee;
    /**
     * Nonce to be set to the transaction. If not present, last known nonce will be used.
     */
    nonce?: number;
}
