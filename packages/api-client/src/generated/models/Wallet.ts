/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type Wallet = {
    /**
     * Generated mnemonic for wallet.
     */
    mnemonic: string;
    /**
     * Generated Extended public key for wallet with derivation path according to BIP44. This key can be used to generate addresses.
     */
    xpub: string;
}
