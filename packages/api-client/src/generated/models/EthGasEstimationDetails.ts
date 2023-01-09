/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * Detailed estimations for safe (under 30 minutes), standard (under 5 minutes) and fast (under 2 minutes) transaction times.
 */
export type EthGasEstimationDetails = {
    /**
     * Safe gas price in wei.
     */
    safe: string;
    /**
     * Standard gas price in wei.
     */
    standard: string;
    /**
     * Fast gas price in wei.
     */
    fast: string;
    /**
     * Base fee for EIP-1559 transactions in wei.
     */
    baseFee: string;
}
