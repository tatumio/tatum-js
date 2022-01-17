/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type Error403BlockageAmount = {
    /**
     * blockage.amount.exceeded
     */
    errorCode: string;
    /**
     * Amount to transfer is greater then amount of the blockage.
     */
    message: string;
    /**
     * 403
     */
    statusCode: number;
}
