/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type TrustLineXlmBlockchain = {
    /**
     * XLM account address. Must be the one used for generating deposit tags.
     */
    fromAccount: string;
    /**
     * Blockchain address of the issuer of the assets to create trust line for.
     */
    issuerAccount: string;
    /**
     * Asset name.
     */
    token: string;
    /**
     * Secret for account. Secret, or signature Id must be present.
     */
    fromSecret: string;
    /**
     * Amount of the assets to be permitted to send over this trust line. 0 means deletion of the trust line. When no limit is specified, maximum amount available is permitted.
     */
    limit?: string;
}
