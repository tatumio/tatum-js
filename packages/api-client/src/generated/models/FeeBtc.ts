/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type FeeBtc = {
    /**
     * Transaction fee in BTC|LTC to be paid, if transaction should be included in next 1-2 blocks.
     */
    fast: string;
    /**
     * Transaction fee in BTC|LTC to be paid, if transaction should be included in next 5-6 blocks.
     */
    medium: string;
    /**
     * Transaction fee in BTC|LTC to be paid, if transaction should be included in next 7+ blocks.
     */
    slow: string;
}
