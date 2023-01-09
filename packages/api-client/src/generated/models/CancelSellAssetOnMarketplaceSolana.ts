/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type CancelSellAssetOnMarketplaceSolana = {
    /**
     * Blockchain to work with.
     */
    chain: 'SOL';
    /**
     * Blockchain address of the smart contract
     */
    contractAddress: string;
    /**
     * Blockchain address of the listing
     */
    listingId: any;
    /**
     * Blockchain address of the asset owner
     */
    from: any;
    /**
     * The private key used for signing transactions as authority; required if <code>requiresSignOff</code> is set to "true" for the marketplace
     */
    authorityPrivateKey?: string;
    /**
     * The private key of the asset owner
     */
    fromPrivateKey: string;
}
