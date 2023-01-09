/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CustomFee } from './CustomFee';

export type SettleAuctionKMS = {
    /**
     * The blockchain to work with
     */
    chain: 'BSC' | 'ETH' | 'KLAY' | 'MATIC' | 'ONE';
    /**
     * The blockchain address of the auction smart contract
     */
    contractAddress: string;
    /**
     * The ID of the auction
     */
    id: string;
    /**
     * The KMS identifier of the private key of the blockchain address from which the fee will be deducted
     */
    signatureId: string;
    /**
     * (Only if the signature ID is mnemonic-based) The index of the address from which the fee will be deducted that was generated from the mnemonic
     */
    index?: number;
    /**
     * The nonce to be set to the transaction; if not present, the last known nonce will be used
     */
    nonce?: number;
    fee?: CustomFee;
}
