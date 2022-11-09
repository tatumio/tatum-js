/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type TransferAlgorandBlockchain = {
    /**
     * The blockchain address of the sender
     */
    from: string;
    /**
     * The blockchain address of the recipient
     */
    to: string;
    /**
     * The transaction fee in Algos
     */
    fee?: string;
    /**
     * The amount to send in Algos
     */
    amount: string;
    /**
     * The note for the recipient; must not contain spaces
     */
    note?: string;
    /**
     * Private key of sender address. Private key, or signature Id must be present.
     */
    fromPrivateKey: string;
}
