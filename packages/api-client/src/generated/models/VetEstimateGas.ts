/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type VetEstimateGas = {
    /**
     * Sender account address.
     */
    from: string;
    /**
     * Recipient account address.
     */
    to: string;
    /**
     * Amount to send.
     */
    value: string;
    /**
     * Data to send to Smart Contract
     */
    data?: string;
    /**
     * Nonce
     */
    nonce?: number;
}
