/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type AccountSettingsXrpBlockchain = {
    /**
     * XRP account address. Must be the one used for generating deposit tags.
     */
    fromAccount: string;
    /**
     * Secret for account. Secret, or signature Id must be present.
     */
    fromSecret: string;
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
