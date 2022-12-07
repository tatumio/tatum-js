/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type EthGasEstimationBatch = {
    /**
     * If all estimations succeeded.
     */
    error: boolean;
    result: Array<{
        /**
         * If estimation succeeded.
         */
        error: boolean;
        /**
         * Contract address of ERC20 token, if transaction is ERC20 token
         */
        contractAddress?: string;
        data?: {
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
        };
        /**
         * Error message. Present only if error - true.
         */
        msg?: string;
    }>;
}
