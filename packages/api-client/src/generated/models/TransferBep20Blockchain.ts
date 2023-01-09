/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CustomFee } from './CustomFee';

export type TransferBep20Blockchain = {
    /**
     * Blockchain address to send HRM20 token to
     */
    to: string;
    /**
     * Amount to be sent.
     */
    amount: string;
    /**
     * Address of HRM20 token
     */
    contractAddress: string;
    /**
     * Number of decimal points that HRM20 token has.
     */
    digits: number;
    /**
     * Private key of sender address. Private key, or signature Id must be present.
     */
    fromPrivateKey: string;
    /**
     * Nonce to be set to ONE transaction. If not present, last known nonce will be used.
     */
    nonce?: number;
    fee?: CustomFee;
}
