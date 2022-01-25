/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type BatchTransactionResult = Array<{
    /**
     * Transaction internal reference - unique identifier within Tatum ledger. In order of failure, use this value to search for problems.
     */
    reference?: string;
}>;