/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type PrivKeyRequest = {
    /**
     * Derivation index of private key to generate.
     */
    index: number;
    /**
     * Mnemonic to generate private key from.
     */
    mnemonic: string;
}
