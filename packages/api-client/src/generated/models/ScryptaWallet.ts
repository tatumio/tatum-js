/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type ScryptaWallet = {
    /**
     * Mnemonic seed for the generated wallet
     */
    mnemonic: string;
    /**
     * Extended public key to generate addresses from the wallet.
     */
    xpub: string;
}
