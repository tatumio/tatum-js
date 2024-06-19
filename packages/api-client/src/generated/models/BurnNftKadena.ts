/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type BurnNftKadena = {
    /**
     * The blockchain to work with
     */
    chain: 'KADENA';
    /**
     * ID of token to be destroyed.
     */
    tokenId: string;
    /**
     * The Id of Kadena chain
     */
    chainId: string;
    /**
     * Private key of sender address.
     */
    fromPrivateKey: string;
}
