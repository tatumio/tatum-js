/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type ActionPhase = {
    success: boolean;
    result_code: number;
    total_actions: number;
    skipped_actions: number;
    fwd_fees: number;
    total_fees: number;
    result_code_description?: string;
};
