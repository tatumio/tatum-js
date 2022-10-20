/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type BtcTransactionFromAddressKMSSource = {
    /**
     * The blockchain address to send the assets from
     */
    address: string;
    /**
     * The KMS identifier of the private key of the address to send the assets from
     */
    signatureId: string;
    /**
     * (Only if the signature ID is mnemonic-based and you run KMS v6.2 or later) The index of the address to send the assets from that was generated from the mnemonic
     */
    index?: number;
}
