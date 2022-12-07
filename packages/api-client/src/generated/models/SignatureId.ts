/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type SignatureId = {
    /**
     * ID of prepared payment template to sign. This is should be stored on a client side to retrieve ID of the blockchain transaction, when signing application signs the transaction and broadcasts it to the blockchain.
     */
    signatureId: string;
}
