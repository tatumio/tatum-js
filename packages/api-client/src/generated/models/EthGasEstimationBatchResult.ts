/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { EthGasEstimationBatchResultData } from './EthGasEstimationBatchResultData';

export type EthGasEstimationBatchResult = {
    /**
     * If estimation succeeded.
     */
    error: boolean;
    /**
     * Contract address of ERC20 token, if transaction is ERC20 token
     */
    contractAddress?: string;
    data?: EthGasEstimationBatchResultData;
    /**
     * Error message. Present only if error - true.
     */
    msg?: string;
}
