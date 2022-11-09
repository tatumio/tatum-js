/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CustomFee } from './CustomFee';

export type ApproveCeloErc20 = {
    /**
     * Chain to work with.
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
     * Private key of sender address. Private key, or signature Id must be present.
     */
    fromPrivateKey: string;
    fee?: CustomFee;
    /**
     * Nonce to be set to Celo transaction. If not present, last known nonce will be used.
     */
    nonce?: number;
    /**
     * Currency to pay for transaction gas
     */
    feeCurrency: 'CELO' | 'CUSD' | 'CEUR';
}
