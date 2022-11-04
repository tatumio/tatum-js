/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type FlowCreateAddressFromPubKeyKMS = {
    /**
     * Blockchain account to send from
     */
    account: string;
    /**
     * Public key to be used
     */
    publicKey: string;
    /**
     * Identifier of the secret associated in signing application. Secret, or signature Id must be present.
     */
    signatureId: string;
    /**
     * If signatureId is mnemonic-based, this is the index to the specific address from that mnemonic.
     */
    index?: number;
    /**
     * Weight of the key. If not set, default 1000 will be used.
     */
    weight?: number;
}
