/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CustomFee } from './CustomFee';

export type ApproveTransferCustodialWalletCeloKMS = {
    /**
     * The blockchain to work with
     */
    chain: 'CELO';
    /**
     * The gas pump address that holds the asset
     */
    custodialAddress: string;
    /**
     * The blockchain address to allow the transfer of the asset from the gas pump address
     */
    spender: string;
    /**
     * The type of the asset to transfer. Set <code>0</code> for fungible tokens (ERC-20 or equivalent), <code>1</code> for NFTs (ERC-721 or equivalent), or <code>2</code> for Multi Tokens (ERC-1155 or equivalent).
     */
    contractType: 0 | 1 | 2;
    /**
     * The address of the asset to transfer
     */
    tokenAddress: string;
    /**
     * (Only if the asset is a fungible token or Multi Token) The amount of the asset to transfer. Do not use if the asset is an NFT.
     */
    amount?: string;
    /**
     * (Only if the asset is a Multi Token or NFT) The ID of the token to transfer. Do not use if the asset is a fungible token.
     */
    tokenId?: string;
    /**
     * The KMS identifier of the private key of the blockchain address that owns the gas pump address key ("master address")
     */
    signatureId: string;
    /**
     * (Only if the signature ID is mnemonic-based) The index of the "master address"
     */
    index?: number;
    /**
     * The currency in which the gas fee will be paid
     */
    feeCurrency?: 'CELO' | 'CUSD' | 'CEUR';
    /**
     * The nonce to be set to the transfer transaction; if not present, the last known nonce will be used
     */
    nonce?: number;
    fee?: CustomFee;
}
