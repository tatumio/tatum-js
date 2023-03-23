/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type GasEstimated = {
    /**
     * The estimated price for one gas unit (in wei)
     */
    gasPrice: string;
    /**
     * The number of the gas units needed to process the transaction at the estimated gas price
     */
    gasLimit: number;
}
