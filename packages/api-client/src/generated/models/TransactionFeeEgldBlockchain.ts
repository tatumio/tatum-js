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
     * Additional data that can be passed to a blockchain transaction as a data property; must be in the hexadecimal format
     */
    data?: string;
}
