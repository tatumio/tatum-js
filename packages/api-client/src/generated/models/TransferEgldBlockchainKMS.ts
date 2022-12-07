/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type TransferEgldBlockchainKMS = {
    /**
     * Account address of the sender
     */
    from: string;
    /**
     * Account address of the receiver or smart contract
     */
    to: string;
    /**
     * Value to be sent.
     */
    amount: string;
    /**
     * Custom defined fee. If not present, it will be calculated automatically.
     */
    fee?: {
        /**
         * Gas limit for transaction.
         */
        gasLimit?: string;
        /**
         * Gas price.
         */
        gasPrice?: string;
    };
    /**
     * Additinal data, that will be passed to blockchain transaction as data property.
     */
    data?: string;
    /**
     * If signatureId is mnemonic-based, this is the index to the specific address from that mnemonic.
     */
    index?: number;
    /**
     * Identifier of the private key associated in signing application. Private key, or signature Id must be present.
     */
    signatureId: string;
}
