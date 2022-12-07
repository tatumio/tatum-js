/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type TransferEgldBlockchain = {
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
         * Gas limit for transaction. If transfer to a smart contract, then 500000 + an appropriate amount for the method call
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
     * Private key of sender address. Private key, or signature Id must be present.
     */
    fromPrivateKey: string;
}
