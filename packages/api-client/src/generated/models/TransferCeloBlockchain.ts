/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CustomFee } from './CustomFee';

export type TransferCeloBlockchain = {
    /**
     * Additional data that can be passed to a blockchain transaction as a data property; must be in the hexadecimal format
     */
    data?: string;
    /**
     * Nonce to be set to Celo transaction. If not present, last known nonce will be used.
     */
    nonce?: number;
    /**
     * Blockchain address to send assets
     */
    to: string;
    /**
     * Currency of the transaction.
     */
    currency: 'CELO' | 'CUSD' | 'CEUR';
    /**
     * Currency to pay for transaction gas
     */
    feeCurrency: 'CELO' | 'CUSD' | 'CEUR';
    fee?: CustomFee;
    /**
     * Amount to be sent.
     */
    amount: string;
    /**
     * Private key of sender address. Private key, or signature Id must be present.
     */
    fromPrivateKey: string;
}
