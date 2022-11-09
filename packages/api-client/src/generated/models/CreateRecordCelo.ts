/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CustomFee } from './CustomFee';

export type CreateRecordCelo = {
    /**
     * Log data to be stored on a blockchain.
     */
    data: string;
    /**
     * Blockchain, where to store log data.
     */
    chain: 'CELO';
    /**
     * Currency to pay for transaction gas
     */
    feeCurrency: 'CELO' | 'CUSD' | 'CEUR';
    fee?: CustomFee;
    /**
     * Private key of account, from which the transaction will be initiated. If not present, transaction fee will be debited from Tatum internal account and additional credits will be charged.
     */
    fromPrivateKey?: string;
    /**
     * Nonce to be set to Ethereum transaction. If not present, last known nonce will be used.
     */
    nonce?: number;
    /**
     * Blockchain address to store log on. If not defined, it will be stored on an address, from which the transaction was being made.
     */
    to?: string;
}
