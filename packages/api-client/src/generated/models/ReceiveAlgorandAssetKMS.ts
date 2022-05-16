/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type ReceiveAlgorandAssetKMS = {
    /**
     * Blockchain sender address.
     */
    from: string;
    /**
     * AssetID of the asset you wanna enable for the sender.
     */
    assetId: number;
    /**
     * Identifier of the private key associated in signing application. Private key, or signature Id must be present.
     */
    signatureId: string;
}
