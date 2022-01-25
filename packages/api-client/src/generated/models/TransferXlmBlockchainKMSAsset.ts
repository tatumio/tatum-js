/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type TransferXlmBlockchainKMSAsset = {
    /**
     * Blockchain account to send assets from
     */
    fromAccount: string;
    /**
     * Blockchain address to send assets
     */
    to: string;
    /**
     * Amount to be sent, in XLM.
     */
    amount: string;
    /**
     * Identifier of the secret associated in signing application. Secret, or signature Id must be present.
     */
    signatureId: string;
    /**
     * Set to true, if the destination address is not yet initialized and should be funded for the first time.
     */
    initialize?: boolean;
    /**
     * Asset name. If not defined, transaction is being sent in native XLM asset.
     */
    token: string;
    /**
     * Blockchain address of the issuer of the assets to send, if not native XLM asset.
     */
    issuerAccount: string;
    /**
     * Short message to recipient. It can be either 28 characters long ASCII text, 64 characters long HEX string or uint64 number.
     */
    message?: string;
}
