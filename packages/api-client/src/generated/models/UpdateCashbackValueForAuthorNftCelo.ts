/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CustomFee } from './CustomFee';

export type UpdateCashbackValueForAuthorNftCelo = {
    /**
     * The blockchain to work with
     */
    chain: 'CELO';
    /**
     * The ID of the NFT to update royalty information for
     */
    tokenId: string;
    /**
     * The blockchain address of the NFT to update royalty information for
     */
    contractAddress: string;
    /**
     * The new value of the royalty cashback to be set for the author of the NFT; to disable the royalties for the NFT completely, set this parameter to 0
     */
    cashbackValue: string;
    /**
     * The currency in which the transaction fee will be paid
     */
    feeCurrency: 'CELO' | 'CUSD' | 'CEUR';
    /**
     * The private key of the NFT author's address
     */
    fromPrivateKey: string;
    /**
     * The nonce to be set to the transaction; if not present, the last known nonce will be used
     */
    nonce?: number;
    fee?: CustomFee;
}
