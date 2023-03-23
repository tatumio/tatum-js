/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CustomFee } from './CustomFee';

export type TransferOneBlockchain = {
    /**
     * The amount to transfer
     */
    amount: string;
    /**
     * The currency of the amount to transfer
     */
    currency: 'ONE';
    /**
     * The blockchain address to transfer the amount to
     */
    to: string;
    /**
     * The private key of the blockchain address from which the fee will be deducted
     */
    fromPrivateKey: string;
    fee?: CustomFee;
    /**
     * Additional data that can be passed to a blockchain transaction as a data property; must be in the hexadecimal format
     */
    data?: string;
    /**
     * The nonce to be set to the transaction; if not present, the last known nonce will be used
     */
    nonce?: number;
}
