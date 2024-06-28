/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CustomFee } from './CustomFee';

export type BurnNft = {
    /**
     * The blockchain to work with
     */
    chain: 'ETH' | 'MATIC' | 'KCS' | 'ONE' | 'KLAY' | 'BSC' | 'ZEN' | 'FLR' | 'CRO' | 'BASE' | 'AVAX' | 'OPTIMISM' | 'FTM';
    /**
     * The ID of the NFT to burn
     */
    tokenId: string;
    /**
     * The blockchain address of the NFT to burn
     */
    contractAddress: string;
    /**
     * The private key of the blockchain address from which the fee will be deducted
     */
    fromPrivateKey: string;
    /**
     * The nonce to be set to the transaction; if not present, the last known nonce will be used
     */
    nonce?: number;
    fee?: CustomFee;
}
