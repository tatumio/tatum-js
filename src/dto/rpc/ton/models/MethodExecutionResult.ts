/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { TvmStackRecord } from './TvmStackRecord';

export type MethodExecutionResult = {
    success: boolean;
    /**
     * tvm exit code
     */
    exit_code: number;
    stack: Array<TvmStackRecord>;
    decoded?: any;
};
