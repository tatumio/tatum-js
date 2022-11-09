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
     * The transaction fee in Algos
     */
    fee?: string;
    /**
     * Identifier of the private key associated in signing application. Private key, or signature Id must be present.
     */
    signatureId: string;
    /**
     * If signatureId is mnemonic-based, this is the index to the specific address from that mnemonic.
     */
    index?: number;
}
