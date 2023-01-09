/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * The custom defined fee; if not present, will be calculated automatically
 */
export type CustomFee = {
    /**
     * Gas limit for transaction in gas price.
     */
    gasLimit: string;
    /**
     * Gas price in Gwei.
     */
    gasPrice: string;
}
