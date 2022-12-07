/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type OneEstimateGas = {
    /**
     * Sender address.
     */
    from: string;
    /**
     * Blockchain address to send assets
     */
    to: string;
    /**
     * Amount to be sent in One.
     */
    amount: string;
    /**
     * Additinal data, that can be passed to blockchain transaction as data property.
     */
    data?: string;
}
