/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type BuyAssetOnMarketplaceSolana = {
    /**
     * The blockchain to work with
     */
    chain: 'SOL';
    /**
     * The blockchain address of the marketplace smart contract
     */
    contractAddress: string;
    /**
     * The blockchain address of the listing with the asset that you want to buy
     */
    listingId: any;
    /**
     * The blockchain address of the buyer
     */
    from: any;
    /**
     * The private key used for signing transactions as authority; required if <code>requiresSignOff</code> is set to "true" for the marketplace
     */
    authorityPrivateKey?: string;
    /**
     * The private key of the buyer
     */
    fromPrivateKey: string;
}