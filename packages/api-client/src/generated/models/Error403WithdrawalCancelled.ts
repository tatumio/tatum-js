/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type Error403WithdrawalCancelled = {
    /**
     * withdrawal.not.cancelled.transaction.failed
     */
    errorCode: string;
    /**
     * Unable to cancel withdrawal ${id}, it is impossible to create refund transaction.
     */
    message: string;
    /**
     * 403
     */
    statusCode: number;
}
