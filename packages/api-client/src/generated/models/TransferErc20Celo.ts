/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CustomFee } from './CustomFee';

export type TransferErc20Celo = {
    /**
     * Blockchain address to send ERC20 token to
     */
    to: string;
    /**
     * Amount to be sent.
     */
    amount: string;
    /**
     * Address of ERC20 token
     */
    contractAddress: string;
    /**
     * Number of decimal points that ERC20 token has.
     */
    digits: number;
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
