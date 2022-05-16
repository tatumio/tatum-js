/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type TransferNftAlgo = {
    /**
     * Chain to work with.
     */
    chain: 'ALGO';
    /**
     * Blockchain address to send NFT token to
     */
    to: string;
    /**
     * AssetID of token.
     */
    contractAddress: string;
    /**
     * Private key of sender address.
     */
    fromPrivateKey: string;
}
