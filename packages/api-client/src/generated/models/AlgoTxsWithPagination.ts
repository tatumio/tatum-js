/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AlgoTx } from './AlgoTx';

export type AlgoTxsWithPagination = {
    /**
     * Used for pagination, when making another request provide this token with the next parameter.
     */
    nextToken?: string;
    /**
     * Array of transactions.
     */
    transactions?: Array<AlgoTx>;
}
