/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type BuyAssetOnMarketplaceSolana = {
    /**
     * Blockchain to work with.
     */
    chain: 'SOL';
    /**
     * Blockchain address of a smart contract
     */
    contractAddress: string;
    /**
     * Blockchain address
     */
    listingId: any;
    /**
     * Blockchain address
     */
    from: any;
    /**
     * Private key of sender address. Private key, or signature Id must be present.
     */
    authorityPrivateKey?: string;
    /**
     * Private key of sender address. Private key, or signature Id must be present.
     */
    fromPrivateKey: string;
}
