/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type BtcGetTxByAddressBatch = {
    /**
     * Type of the transaction to fetch - either incoming, or outgoing. If none is present - all transactions are fetched.
     */
    txType?: 'incoming' | 'outgoing';
    /**
     * Addresses
     */
    addresses: Array<string>;
}
