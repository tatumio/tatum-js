/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type DeployNftFlowMnemonic = {
    /**
     * Chain to work with.
     */
    chain: 'FLOW';
    /**
     * Blockchain address of the sender account.
     */
    account: string;
    /**
     * Mnemonic to generate private key of sender address.
     */
    mnemonic: string;
    /**
     * Derivation index of sender address.
     */
    index: number;
}
