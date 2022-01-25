/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type TransferXrpBlockchain = {
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
}
