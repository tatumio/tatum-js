/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type AlgoWallet = {
    /**
     * address of Algorand account.
     */
    address?: string;
    /**
     * secretKey can generate Mnemonic, similar to private Key.
     */
    secret?: string;
    /**
     * Mnemonic of the wallet.
     */
    mnemonic?: string;
}
