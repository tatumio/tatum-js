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
     * The percentage of the amount that an NFT was sold for that will be sent to the marketplace as a fee. To set the fee to 1%, set this parameter to <code>100</code>; to set 10%, set this parameter to <code>1000</code>; to set 50%, set this parameter to <code>5000</code>, and so on.
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
