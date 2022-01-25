/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type Error403WithdrawalPending = {
    /**
     * withdrawal.pending
     */
    errorCode: string;
    /**
     * Unable to prepare withdrawal, last withdrawal with id ${id} is not yet processed by blockchain.
     */
    message: string;
    /**
     * 403
     */
    statusCode: number;
}
