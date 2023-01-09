/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CustomFee } from './CustomFee';

export type GenerateMarketplaceCelo = {
    /**
     * Blockchain to work with.
     */
    chain: 'CELO';
    /**
     * Address of the recipient of the fee for the trade.
     */
    feeRecipient: string;
    /**
     * The currency in which the transaction fee will be paid
     */
    feeCurrency: 'CELO' | 'CUSD' | 'CEUR';
    /**
     * The percentage of the amount that an NFT was sold for that will be sent to the marketplace as a fee. To set the fee to 1%, set this parameter to <code>100</code>; to set 10%, set this parameter to <code>1000</code>; to set 50%, set this parameter to <code>5000</code>, and so on.
     */
    marketplaceFee: number;
    /**
     * Private key of sender address. Private key, or signature Id must be present.
     */
    fromPrivateKey: string;
    /**
     * The nonce to be set to the transaction; if not present, the last known nonce will be used
     */
    nonce?: number;
    fee?: CustomFee;
}
