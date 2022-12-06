/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type SellAssetOnMarketplaceSolanaKMS = {
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
     * Identifier of the private key used for signing transaction as authority. Required if requiresSignOff is true
     */
    authoritySignatureId?: string;
    /**
     * Identifier of the private key associated in signing application. Private key, or signature Id must be present.
     */
    signatureId: string;
}
