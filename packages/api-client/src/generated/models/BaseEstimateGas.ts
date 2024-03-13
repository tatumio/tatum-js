/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type BaseEstimateGas = {
    /**
     * Sender address.
     */
    from: string;
    /**
     * Blockchain address to send assets
     */
    to: string;
    /**
     * Amount to be sent in Base.
     */
    amount: string;
    /**
     * Additional data that can be passed to a blockchain transaction as a data property; must be in the hexadecimal format
     */
    data?: string;
}
