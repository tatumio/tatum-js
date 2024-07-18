/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type SignRawMessage = {
    address: string;
    /**
     * Number of nanocoins to send. Decimal string.
     */
    amount: string;
    /**
     * Raw one-cell BoC encoded in hex.
     */
    payload?: string;
    /**
     * Raw once-cell BoC encoded in hex.
     */
    stateInit?: string;
};
