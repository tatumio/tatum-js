/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { EthGasEstimationBatchResult } from './EthGasEstimationBatchResult';

export type EthGasEstimationBatch = {
    /**
     * If all estimations succeeded.
     */
    error: boolean;
    result: Array<EthGasEstimationBatchResult>;
}
