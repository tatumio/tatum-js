/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type AdaAccountBalance = Array<{
    currency?: {
        /**
         * Name of the asset.
         */
        symbol?: string;
        /**
         * Number of decimal places.
         */
        decimals?: number;
    };
    /**
     * Quantity of the asset.
     */
    value?: string;
}>;
