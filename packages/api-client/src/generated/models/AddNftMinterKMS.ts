/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CustomFee } from './CustomFee';

export type AddNftMinterKMS = {
    /**
     * The blockchain to work with
     */
    chain: 'BSC' | 'CELO' | 'ETH' | 'KLAY' | 'KCS' | 'MATIC' | 'ONE';
    /**
     * The blockchain address of the NFT smart contract
     */
    contractAddress: string;
    /**
     * The blockchain address to add to the smart contract as an NFT minter
     */
    minter: string;
    /**
     * The KMS identifier of the private key of the blockchain address from which the fee will be deducted
     */
    signatureId: string;
    /**
     * (Only if the signature ID is mnemonic-based) The index of the address to pay the transaction fee that was generated from the mnemonic
     */
    index?: number;
    /**
     * The nonce to be set to the transaction; if not present, the last known nonce will be used
     */
    nonce?: number;
    fee?: CustomFee;
    /**
     * (Celo only) The currency in which the transaction fee will be paid
     */
    feeCurrency?: 'CELO' | 'CUSD' | 'CEUR';
}
