/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type CancelSellAssetOnMarketplaceSolanaKMS = {
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
     * Identifier of the private key used for signing transaction as authority. Required if requiresSignOff is true
     */
    authoritySignatureId?: string;
    /**
     * Identifier of the private key associated in signing application. Private key, or signature Id must be present.
     */
    signatureId: string;
}
