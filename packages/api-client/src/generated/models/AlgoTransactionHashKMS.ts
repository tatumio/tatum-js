/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type AlgoTransactionHashKMS = {
    /**
     * TX hash of transaction.
     */
    txId: string;
    /**
     * If transaction created new ASA asset, this value is the index of the asset on the network.
     */
    assetIndex?: number;
    /**
     * If transaction was not confirmed within 5 rounds, result is false.
     */
    confirmed?: boolean;
    /**
     * In case of the transaction was broadcast to the blockchain, but it was not possible to complete Tatum KMS signature, reponse is marked as failed and must be marked manually.
     */
    failed?: boolean;
}
