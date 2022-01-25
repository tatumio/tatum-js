/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type TransferXlmBlockchainKMS = {
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
     * Short message to recipient. It can be either 28 characters long ASCII text, 64 characters long HEX string or uint64 number.
     */
    message?: string;
}
