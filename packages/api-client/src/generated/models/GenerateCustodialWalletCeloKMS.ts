/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CustomFee } from './CustomFee';

export type GenerateCustodialWalletCeloKMS = {
    /**
     * Blockchain to work with.
     */
    chain: 'CELO';
    /**
     * The currency in which the gas fee will be paid
     */
    feeCurrency?: 'CELO' | 'CUSD' | 'CEUR';
    /**
     * Identifier of the private key associated in signing application. Private key, or signature Id must be present.
     */
    signatureId: string;
    /**
     * If signatureId is mnemonic-based, this is the index to the specific address from that mnemonic.
     */
    index?: number;
    /**
     * If address should support ERC20 tokens, it should be marked as true.
     */
    enableFungibleTokens: boolean;
    /**
     * If address should support ERC721 tokens, it should be marked as true.
     */
    enableNonFungibleTokens: boolean;
    /**
     * If address should support ERC1155 tokens, it should be marked as true.
     */
    enableSemiFungibleTokens: boolean;
    /**
     * If address should support batch transfers of the assets, it should be marked as true.
     */
    enableBatchTransactions: boolean;
    fee?: CustomFee;
    /**
     * The nonce to be set to the transaction; if not present, the last known nonce will be used
     */
    nonce?: number;
}
