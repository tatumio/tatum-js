/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CustomFee } from './CustomFee';

export type TransferNftKMS = {
    /**
     * If token to be transferred is Royalty NFT token, this is a value to be paid as a cashback to the authors of the token.
     */
    value?: string;
    /**
     * The blockchain to work with
     */
    chain: 'ETH' | 'MATIC' | 'KCS' | 'ONE' | 'KLAY' | 'BSC';
    /**
     * Blockchain address to send NFT token to
     */
    to: string;
    /**
     * ID of the token.
     */
    tokenId: string;
    /**
     * Address of NFT token
     */
    contractAddress: string;
    /**
     * If signatureId is mnemonic-based, this is the index to the specific address from that mnemonic.
     */
    index?: number;
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
     * Identifier of the private key associated in signing application. Private key, or signature Id must be present.
     */
    signatureId: string;
    /**
     * The nonce to be set to the transaction; if not present, the last known nonce will be used
     */
    nonce?: number;
    fee?: CustomFee;
}
