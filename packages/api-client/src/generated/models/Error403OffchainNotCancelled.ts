/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type Error403OffchainNotCancelled = {
    /**
     * withdrawal.not.cancelled.transaction.failed
     */
    errorCode: string;
    /**
     * Unable to broadcast transaction, and impossible to cancel withdrawal. ID is attached, "${withdrawalId}", cancel it manually.
     */
    message: string;
    /**
     * 403
     */
    statusCode: number;
}
