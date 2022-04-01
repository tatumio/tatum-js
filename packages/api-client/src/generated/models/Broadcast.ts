/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type Broadcast = {
    /**
     * Raw signed transaction to be published to network.
     */
    txData: string;
    /**
     * Identifier of KMS pending transaction ID to be completed with the broadcast.
     */
    signatureId?: string;
}
