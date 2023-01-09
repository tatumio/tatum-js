/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type FlowCreateAddressFromPubKeyMnemonic = {
    /**
     * Blockchain account to send from
     */
    account: string;
    /**
     * Public key to be used; will be assigned to a newly created address and will have a weight of 1000
     */
    publicKey: string;
    /**
     * Mnemonic to generate private key.
     */
    mnemonic: string;
    /**
     * Index to the specific address from mnemonic.
     */
    index: number;
}
