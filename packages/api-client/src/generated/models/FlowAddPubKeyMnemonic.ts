/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type FlowAddPubKeyMnemonic = {
    /**
     * Blockchain account to send from
     */
    account: string;
    /**
     * Public key to be used
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
    /**
     * Weight of the key. If not set, default 1000 will be used.
     */
    weight?: number;
}
