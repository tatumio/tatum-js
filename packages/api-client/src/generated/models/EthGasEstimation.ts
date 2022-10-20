/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { EthGasEstimationDetails } from './EthGasEstimationDetails';

export type EthGasEstimation = {
    /**
     * Gas limit for transaction in gas price.
     */
    gasLimit: string;
    /**
     * Gas price in wei.
     */
    gasPrice: string;
    estimations: EthGasEstimationDetails;
}
