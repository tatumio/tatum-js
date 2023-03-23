/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * The custom defined fee; if not present, will be calculated automatically
 */
export type CustomFee = {
    /**
     * The price for one gas unit (in Gwei)
     */
    gasPrice: string;
    /**
     * The maximum number of gas units that you are willing to spend on processing the transaction at the provided gas price
     */
    gasLimit: string;
}
