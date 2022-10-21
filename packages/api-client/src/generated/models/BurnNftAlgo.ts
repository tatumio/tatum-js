/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type BurnNftAlgo = {
    /**
     * Chain to work with.
     */
    chain: 'ALGO';
    /**
     * Asset index
     */
    contractAddress: string;
    /**
     * Private key of sender address. Private key, or signature Id must be present.
     */
    fromPrivateKey: string;
}
