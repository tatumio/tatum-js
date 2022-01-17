/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type Error403WithdrawalFailed = {
    /**
     * withdrawal.failed.transaction.failed
     */
    errorCode: string;
    /**
     * Unable to store withdrawal, it is impossible to create transaction.
     */
    message: string;
    /**
     * 403
     */
    statusCode: number;
}
