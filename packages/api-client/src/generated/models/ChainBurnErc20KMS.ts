/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CustomFee } from './CustomFee';

export type ChainBurnErc20KMS = {
    /**
     * The blockchain to work with
     */
    chain: 'ETH' | 'BSC' | 'MATIC' | 'KLAY' | 'XDC' | 'ONE' | 'ALGO';
    /**
     * Amount of tokens to be destroyed.
     */
    amount: string;
    /**
     * Address of ERC20 token
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
}
