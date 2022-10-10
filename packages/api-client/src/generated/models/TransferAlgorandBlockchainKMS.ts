/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type TransferAlgorandBlockchainKMS = {
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
    fee: string;
    /**
     * The amount to send in Algos
     */
    amount: string;
    /**
     * The note for the recipient; must not contain spaces
     */
    note?: string;
    /**
     * If signatureId is mnemonic-based, this is the index to the specific address from that mnemonic.
     */
    index?: number;
    /**
     * Identifier of the private key associated in signing application. Private key, or signature Id must be present.
     */
    signatureId: string;
}
