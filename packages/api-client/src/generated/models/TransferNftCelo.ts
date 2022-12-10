/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CustomFee } from './CustomFee';

export type TransferNftCelo = {
    /**
     * If token to be transferred is Royalty NFT token, this is a value to be paid as a cashback to the authors of the token.
     */
    value?: string;
    /**
     * The blockchain to work with
     */
    chain: 'CELO';
    /**
     * Blockchain address to send NFT token to
     */
    to: string;
    /**
     * ID of the token.
     */
    tokenId: string;
    /**
     * True if the contract is provenance type
     */
    provenance?: boolean;
    /**
     * data you want to store with transaction, optional and valid only if provenance contract
     */
    provenanceData?: string;
    /**
     * current price of the token, valid only for provenance
     */
    tokenPrice?: string;
    /**
     * Address of NFT token
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
