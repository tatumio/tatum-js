/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type GenerateMarketplaceTron = {
    /**
     * Blockchain to work with.
     */
    chain?: 'TRON';
    /**
     * Address of the recipient of the fee for the trade.
     */
    feeRecipient: string;
    /**
     * Percentage of the selling amount of the NFT asset. 100 - 1%
     */
    marketplaceFee: number;
    /**
     * Private key of sender address. Private key, or signature Id must be present.
     */
    fromPrivateKey: string;
    /**
     * Fee in TRX to be paid.
     */
    feeLimit: number;
}
