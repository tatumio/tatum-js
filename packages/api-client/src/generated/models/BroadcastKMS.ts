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
    /**
     * (Only if the signature ID is mnemonic-based and you run KMS v6.2 or later) The index of the address to send the assets from that was generated from the mnemonic
     */
    index?: number;
}
