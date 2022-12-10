/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type TransferVetBlockchainKMS = {
    /**
     * Blockchain address to send assets
     */
    to: string;
    /**
     * Amount to be sent in VET
     */
    amount: string;
    /**
     * Identifier of the private key associated in signing application. Private key, or signature Id must be present.
     */
    signatureId: string;
    /**
     * Additional data that can be passed to a blockchain transaction as a data property; must be in the hexadecimal format
     */
    data?: string;
    /**
     * Custom defined fee. If not present, it will be calculated automatically.
     */
    fee?: {
        /**
         * Gas limit for transaction.
         */
        gasLimit: string;
    };
}
