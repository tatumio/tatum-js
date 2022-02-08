/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type GenerateMarketplaceTronKMS = {
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
     * Address of the recipient of the fee for the trade.
     */
    from: string;
    /**
     * Identifier of the private key associated in signing application. Private key, or signature Id must be present.
     */
    signatureId: string;
    /**
     * If signatureId is mnemonic-based, this is the index to the specific address from that mnemonic.
     */
    index?: number;
    /**
     * Fee in TRX to be paid.
     */
    feeLimit: number;
}
