/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CustomFee } from './CustomFee';

export type CreateRecordCelo = {
    /**
     * The data to be stored on the blockchain
     */
    data: string;
    /**
     * The blockchain to store the data on
     */
    chain: 'CELO';
    /**
     * The currency in which the transaction fee will be paid
     */
    feeCurrency: 'CELO' | 'CUSD' | 'CEUR';
    fee?: CustomFee;
    /**
     * Private key of account, from which the transaction will be initiated. If not present, transaction fee will be debited from Tatum internal account and additional credits will be charged.
     */
    fromPrivateKey: string;
    /**
     * Nonce to be set to Ethereum transaction. If not present, last known nonce will be used.
     */
    nonce?: number;
    /**
     * The blockchain address to store the data on<br/>If not provided, the data will be stored on the address from which the transaction is made
     */
    to?: string;
}
