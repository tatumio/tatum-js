/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CustomFee } from './CustomFee';

export type ChainMintCeloErc20 = {
    /**
     * The blockchain to work with
     */
    chain: 'CELO';
    /**
     * Amount to be minted and transferred to the recipient.
     */
    amount: string;
    /**
     * Blockchain address to send ERC-20 tokens to.
     */
    to: string;
    /**
     * Address of ERC-20 token
     */
    contractAddress: string;
    /**
     * Private key of sender address. Private key, or signature Id must be present.
     */
    fromPrivateKey: string;
    /**
     * The nonce to be set to the transaction; if not present, the last known nonce will be used
     */
    nonce?: number;
    /**
     * The currency in which the transaction fee will be paid
     */
    feeCurrency: 'CELO' | 'CUSD' | 'CEUR';
    fee?: CustomFee;
}
