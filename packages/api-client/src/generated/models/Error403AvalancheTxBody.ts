/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type Error403AvalancheTxBody = {
    /**
     * avalanche.transaction.body
     */
    errorCode: string;
    /**
     * Either currency, or tokenAddress must be defined.
     */
    message: string;
    /**
     * 403
     */
    statusCode: number;
}
