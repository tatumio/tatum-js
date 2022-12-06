/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type SellAssetOnMarketplaceSolana = {
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
    nftAddress: string;
    /**
     * Blockchain address
     */
    from: any;
    /**
     * Price of the asset to sell. Marketplace fee will be obtained on top of this price.
     */
    price: string;
    /**
     * Private key of sender address. Private key, or signature Id must be present.
     */
    authorityPrivateKey?: string;
    /**
     * Private key of sender address. Private key, or signature Id must be present.
     */
    fromPrivateKey: string;
}
