/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type Wallet = {
    /**
     * Mnemonic to generate private key for the account of QTUM, from which the gas will be paid (index will be used).
     */
    mnemonic?: string;
    xpub?: string;
}
