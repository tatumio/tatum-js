/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CustomFee } from './CustomFee';

export type ApproveCeloErc20KMS = {
    /**
     * The blockchain to work with
     */
    chain: 'CELO';
    /**
     * Amount to be approved for the spender.
     */
    amount: string;
    /**
     * Blockchain address of the new spender.
     */
    spender: string;
    /**
     * Address of ERC-20 token
     */
    contractAddress: string;
    /**
     * Identifier of the private key associated in signing application. Private key, or signature Id must be present.
     */
    signatureId: string;
    fee?: CustomFee;
    /**
     * The nonce to be set to the transaction; if not present, the last known nonce will be used
     */
    nonce?: number;
    /**
     * The currency in which the transaction fee will be paid
     */
    feeCurrency: 'CELO' | 'CUSD' | 'CEUR';
}
