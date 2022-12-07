/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type ReceiveAlgorandAsset = {
    /**
     * AssetID of the asset you wanna enable for the sender.
     */
    assetId: string;
    /**
     * Private key of sender address. Private key, or signature Id must be present.
     */
    fromPrivateKey: string;
}
