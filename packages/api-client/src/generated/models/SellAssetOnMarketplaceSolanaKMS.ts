/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type SellAssetOnMarketplaceSolanaKMS = {
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
     * The KMS identifier of the private key used for signing transactions as authority; required if <code>requiresSignOff</code> is set to "true" for the marketplace
     */
    authoritySignatureId?: string;
    /**
     * The KMS identifier of the private key of the seller
     */
    signatureId: string;
}
