/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type TransactionResult = {
    /**
     * The internal reference to the transaction (a unique identifier of the transaction within the virtual account); if the transaction fails, use this reference to search through the logs
     */
    reference?: string;
}
