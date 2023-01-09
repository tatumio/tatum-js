/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CustomFee } from './CustomFee';

export type AddNftMinter = {
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
     * The private key of the blockchain address from which the fee will be deducted
     */
    fromPrivateKey: string;
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
