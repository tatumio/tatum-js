/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ResponseData } from './ResponseData';

export type WithdrawalResponse = {
    /**
     * Transaction reference of the transaction connected to this withdrawal.
     */
    reference?: string;
    data?: Array<ResponseData>;
    /**
     * ID of withdrawal
     */
    id?: string;
}
