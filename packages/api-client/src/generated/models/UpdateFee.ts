/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CustomFee } from './CustomFee';

export type UpdateFee = {
    /**
     * The blockchain to work with
     */
    chain: 'ETH' | 'ONE' | 'BSC' | 'KLAY' | 'MATIC';
    /**
     * The blockchain address of the marketplace smart contract
     */
    contractAddress: string;
    /**
     * The percentage of the amount that an NFT was sold for that will be sent to the marketplace as a fee. To set the fee to 1%, set this parameter to <code>100</code>; to set 10%, set this parameter to <code>1000</code>; to set 50%, set this parameter to <code>5000</code>, and so on.
     */
    marketplaceFee: number;
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
