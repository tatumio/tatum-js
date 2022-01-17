/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type GeneratePrivateKey = {
    /**
     * Mnemonic to generate private key for the account of QTUM, from which the gas will be paid (index will be used).
     */
    mnemonic: string;
    /**
     * derivation index of address to pay for deployment of ERC20
     */
    index: number;
}
