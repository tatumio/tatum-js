/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type TransferNftAlgo = {
    /**
     * The blockchain to work with
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
    /**
     * The transaction fee in Algos
     */
    fee?: string;
}
