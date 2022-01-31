/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type Error404TxNotFound = {
    /**
     * tx.not.found
     */
    errorCode: string;
    /**
     * Transaction not found. Possible not exists or is still pending.
     */
    message: string;
    /**
     * 404
     */
    statusCode: number;
}
