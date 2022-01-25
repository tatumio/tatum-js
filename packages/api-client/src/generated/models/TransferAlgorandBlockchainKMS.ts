/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type TransferAlgorandBlockchainKMS = {
    /**
     * Blockchain sender address.
     */
    from: string;
    /**
     * Blockchain address to send algo
     */
    to: string;
    /**
     * Transaction fee in MicroAlgos.
     */
    fee?: string;
    /**
     * Amount to be sent in MicroAlgos.
     */
    amount: string;
    /**
     * Helloworld
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
