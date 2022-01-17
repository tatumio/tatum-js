/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type BroadcastKMS = {
    /**
     * Raw signed transaction to be published to network.
     */
    txData: string;
    /**
     * ID of prepared payment template to sign. Required only, when broadcasting transaction signed by Tatum KMS.
     */
    signatureId?: string;
}
