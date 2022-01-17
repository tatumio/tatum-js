/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type TransferVetBlockchain = {
    /**
     * Blockchain address to send assets
     */
    to: string;
    /**
     * Amount to be sent in VET
     */
    amount: string;
    /**
     * Private key of sender address. Private key, or signature Id must be present.
     */
    fromPrivateKey?: string;
    /**
     * Identifier of the private key associated in signing application. Private key, or signature Id must be present.
     */
    signatureId?: string;
    /**
     * Additinal data, that can be passed to blockchain transaction as data property.
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
