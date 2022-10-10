/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type TransactionFeeEgldBlockchain = {
    /**
     * Account address of the sender
     */
    sender: string;
    /**
     * Account address of the receiver or smart contract
     */
    receiver: string;
    /**
     * Value to be sent.
     */
    value: string;
    /**
     * Additinal data, that will be passed to blockchain transaction.
     */
    data?: string;
}
