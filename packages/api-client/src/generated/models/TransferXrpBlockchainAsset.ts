/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type TransferXrpBlockchainAsset = {
    /**
     * XRP account address. Must be the one used for generating deposit tags.
     */
    fromAccount: string;
    /**
     * Blockchain address to send assets
     */
    to: string;
    /**
     * Amount to be sent, in XRP.
     */
    amount: string;
    /**
     * Secret for account. Secret, or signature Id must be present.
     */
    fromSecret: string;
    /**
     * Fee to be paid, in XRP. If omitted, current fee will be calculated.
     */
    fee?: string;
    /**
     * Source tag of sender account, if any.
     */
    sourceTag?: number;
    /**
     * Destination tag of recipient account, if any.
     */
    destinationTag?: number;
    /**
     * Blockchain address of the issuer of the assets to create trust line for.
     */
    issuerAccount: string;
    /**
     * Asset name. Must be 160bit HEX string, e.g. SHA1.
     */
    token: string;
}
