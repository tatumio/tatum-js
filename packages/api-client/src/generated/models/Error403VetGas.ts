/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type Error403VetGas = {
    /**
     * vet.transaction.gas
     */
    errorCode: string;
    /**
     * Unable to calculate gas limit for transaction. ${error}
     */
    message: string;
    /**
     * 403
     */
    statusCode: number;
}
