/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type TransactionHashKMS = {
    /**
     * TX hash of successful transaction.
     */
    txId: string;
    /**
     * In case of the transaction was broadcast to the blockchain, but it was not possible to complete Tatum KMS signature, reponse is marked as failed and must be marked manually.
     */
    failed?: boolean;
}
