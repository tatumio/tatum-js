/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ComputeSkipReason } from './ComputeSkipReason';

export type ComputePhase = {
    skipped: boolean;
    skip_reason?: ComputeSkipReason;
    success?: boolean;
    gas_fees?: number;
    gas_used?: number;
    vm_steps?: number;
    exit_code?: number;
    exit_code_description?: string;
};
