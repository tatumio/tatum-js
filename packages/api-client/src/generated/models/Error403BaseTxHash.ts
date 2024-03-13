/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type Error403BaseTxHash = {
    /**
     * base.transaction.hash
     */
    errorCode: string;
    /**
     * Unable to calculate transaction hash. ${error}
     */
    message: string;
    /**
     * 403
     */
    statusCode: number;
}
