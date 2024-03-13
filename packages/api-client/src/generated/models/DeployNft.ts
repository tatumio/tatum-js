/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CustomFee } from './CustomFee';

export type DeployNft = {
    /**
     * The blockchain to work with
     */
    chain: 'ETH' | 'MATIC' | 'KCS' | 'ONE' | 'KLAY' | 'BSC' | 'ZEN' | 'FLR' | 'CRO' | 'BASE';
    /**
     * Name of the NFT token
     */
    name: string;
    /**
     * Symbol of the NFT token
     */
    symbol: string;
    /**
     * Private key of account address, from which gas for deployment of ERC721 will be paid. Private key, or signature Id must be present.
     */
    fromPrivateKey: string;
    /**
     * True if the contract is publicMint type. False by default.
     */
    publicMint?: boolean;
    /**
     * The nonce to be set to the transaction; if not present, the last known nonce will be used
     */
    nonce?: number;
    fee?: CustomFee;
}
