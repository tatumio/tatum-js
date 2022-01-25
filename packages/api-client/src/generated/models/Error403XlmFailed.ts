/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type Error403XlmFailed = {
    /**
     * xlm.failed
     */
    errorCode: string;
    /**
     * Unable to communicate with blockchain. ${error}
     */
    message: string;
    /**
     * 403
     */
    statusCode: number;
}
