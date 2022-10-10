/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type EthGasEstimation = {
    /**
     * Gas limit for transaction in gas price.
     */
    gasLimit: string;
    /**
     * Gas price in wei.
     */
    gasPrice: string;
    /**
     * Detailed estimations for safe (under 30 minutes), standard (under 5 minutes) and fast (under 2 minutes) transaction times.
     */
    estimations: {
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
    };
}
