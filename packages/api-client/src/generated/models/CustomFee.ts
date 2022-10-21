/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * Custom defined fee. If not present, it will be calculated automatically.
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
