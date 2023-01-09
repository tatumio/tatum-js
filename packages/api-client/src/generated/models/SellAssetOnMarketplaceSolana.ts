/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type SellAssetOnMarketplaceSolana = {
    /**
     * Blockchain to work with.
     */
    chain: 'SOL';
    /**
     * Blockchain address of the smart contract
     */
    contractAddress: string;
    /**
     * Blockchain address of the asset to sell
     */
    nftAddress: string;
    /**
     * Blockchain address of the seller
     */
    from: any;
    /**
     * Price of the asset to sell. Marketplace fee will be obtained on top of this price.
     */
    price: string;
    /**
     * The private key used for signing transactions as authority; required if <code>requiresSignOff</code> is set to "true" for the marketplace
     */
    authorityPrivateKey?: string;
    /**
     * The private key of the seller
     */
    fromPrivateKey: string;
}
