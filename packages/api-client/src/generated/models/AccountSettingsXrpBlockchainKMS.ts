/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type AccountSettingsXrpBlockchainKMS = {
    /**
     * XRP account address. Must be the one used for generating deposit tags.
     */
    fromAccount: string;
    /**
     * Identifier of the private key associated in signing application. Secret or signature Id must be present.
     */
    signatureId: string;
    /**
     * Fee to be paid, in XRP. If omitted, current fee will be calculated.
     */
    fee?: string;
    /**
     * Should be true, if an account is the issuer of assets.
     */
    rippling?: boolean;
    /**
     * Should be true, if an account should support off-chain processing.
     */
    requireDestinationTag?: boolean;
}
